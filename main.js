const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

const switchViewButtons = document.querySelectorAll(".switch-view");
const overview = document.querySelector(".overview");
const newentry = document.querySelector(".new-entry");

for (let i = 0; i < switchViewButtons.length; i++) {
  switchViewButtons[i].addEventListener("click", () => {
    overview.classList.toggle("hide");
    newentry.classList.toggle("hide");
  });
}

