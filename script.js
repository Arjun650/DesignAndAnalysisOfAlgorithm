// Get the popup element and the buttons
const popup = document.getElementById("popup");
const openPopupBtn = document.getElementById("openPopupBtn");
const closePopupBtn = document.getElementById("closePopupBtn");

// Show the popup when the "Open Popup" button is clicked
openPopupBtn.addEventListener("click", function() {
  popup.style.display = "block";
});

// Hide the popup when the "Close" button (x) is clicked
closePopupBtn.addEventListener("click", function() {
  popup.style.display = "none";
});

// Optionally, hide the popup when clicking outside of the popup content
window.addEventListener("click", function(event) {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});
