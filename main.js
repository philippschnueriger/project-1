const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

const switchView = document.querySelector(".switch-view");
const overview = document.querySelector(".overview");
const newentry = document.querySelector(".new-entry");

switchView.addEventListener("click", () => {
  overview.classList.toggle("hide");
  newentry.classList.toggle("hide");
});

