// Back button function
function goBack() {
  window.history.back();
}

// Example interactive effect (optional)
// When user hovers on feature box, log the name
document.querySelectorAll(".feature-box").forEach(box => {
  box.addEventListener("mouseenter", () => {
    console.log("Hovered on:", box.querySelector("h3").innerText);
  });
});
