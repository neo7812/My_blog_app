document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const inputs = form.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        if (!input.value && input.hasAttribute("required")) {
          input.style.borderColor = "#e74c3c";
          input.placeholder = "This field is required!";
        } else {
          input.style.borderColor = "#ddd";
        }
      });
    });
  });

  const backLinks = document.querySelectorAll('a[href="/dashboard"]');
  backLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => (window.location.href = "/dashboard"), 300);
    });
  });
});
