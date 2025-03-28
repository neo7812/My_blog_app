const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", upload.single("profileImage"), async (req, res) => {
  const { username, email, password } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

  if (!username || username.length < 3) {
    return res.send("Username must be at least 3 characters!");
  }
  if (!email.includes("@") || !email.includes(".")) {
    return res.send("Invalid email format!");
  }
  if (password.length < 6) {
    return res.send("Password must be at least 6 characters!");
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username) {
        return res.send("Username already taken!");
      }
      if (existingUser.email === email) {
        return res.send("Email already in use!");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      profileImage,
    });
    await user.save();
    res.send('Signup successful! <a href="/login">Login here</a>');
  } catch (err) {
    console.log("Error during signup:", err);
    res.send("Something went wrong!");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("Please fill in all fields!");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("User not found!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send("Wrong password!");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (err) {
    console.log("Login error:", err);
    res.send("Login failed!");
  }
});

module.exports = router;
