// Contact form validation & submit demo
const form = document.getElementById("contactForm");
const result = document.getElementById("formResult");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    result.textContent = "❌ Please fill all fields!";
    result.style.color = "red";
    return;
  }

  // Simple email validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    result.textContent = "❌ Enter a valid email address!";
    result.style.color = "red";
    return;
  }

  // If valid
  result.textContent = `✅ Thank you, ${name}! Your message has been sent.`;
  result.style.color = "green";

  // Reset form
  form.reset();
});

// Back button function
function goBack() {
  window.history.back();
}
