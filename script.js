console.log("do you like cookies?");
const audio = document.querySelector(".backingTrack");
const optionsButton = document.getElementById("options-button");
const volumeControl = document.getElementById("volume-control");
const volumeControlContainer = document.getElementById(
  "volume-control-container"
);
const clickSound = document.getElementById("click-sound");
const resetSound = document.getElementById("reset-sound");
const toggleMusicButton = document.getElementById("toggle-music");
const storeButton = document.getElementById("store-button");
const shopUpgrades = document.getElementById("shop-upgrades");

audio.volume = 1;
audio.muted = false;

// Show or hide the volume control when the option button is clicked
optionsButton.addEventListener("click", function () {
  if (volumeControlContainer.style.display === "none") {
    volumeControlContainer.style.display = "block";
  } else {
    volumeControlContainer.style.display = "none";
  }
});

// Change the audio volume based on the selected input
volumeControl.addEventListener("input", function () {
  audio.volume = this.value;
  localStorage.setItem("audioVolume", this.value);
});
document.addEventListener("DOMContentLoaded", function () {
  const savedVolume = localStorage.getItem("audioVolume") || "1";
  volumeControl.value = savedVolume;
  audio.volume = savedVolume;
});

let isMusicPlaying = true;

// Toggle music play and pause
toggleMusicButton.addEventListener("click", function () {
  if (isMusicPlaying) {
    audio.pause();
    toggleMusicButton.innerText = "Play Music";
  } else {
    audio.play();
    toggleMusicButton.innerText = "Pause Music";
  }
  isMusicPlaying = !isMusicPlaying;
});

// Load cookie count from local storage or set to 0
let cookieCount = parseInt(localStorage.getItem("cookieCount")) || 0;
let cookiesPerSecond = 1;
let autoClicks = 0;
function updateCookieCount() {
  document.getElementById("cookie-count").innerText =
    "Cookie Count: " + cookieCount;
  document.getElementById("cookies-per-second").innerText =
    "Cookies per Second: " + (cookiesPerSecond + autoClicks);
  localStorage.setItem("cookieCount", cookieCount);
  updateUpgradeButtons();
}
// Function to update cookie count displayed on the screen

function updateCookieCount() {
  document.getElementById("cookie-count").innerText =
    "Cookie Count: " + cookieCount;
  document.getElementById("cookies-per-second").innerText =
    "Cookies per Second: " + (cookiesPerSecond + autoClicks);
  localStorage.setItem("cookieCount", cookieCount);
  updateUpgradeButtons();
}
function updateUpgradeButtons() {
  const upgradeButtons = document.querySelectorAll(".upgrade button");
  upgradeButtons.forEach((button) => {
    const cost = parseInt(button.dataset.cost);
    button.disabled = cookieCount < cost;
  });
}
// Debounce function to handle rapid clicks on the cookie button
function debounce(func, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}
const handleCookieClick = debounce(function () {
  clickSound.currentTime = 0;
  clickSound.play();
  cookieCount++;
  updateCookieCount();
}, 100);
// Handle cookie button clicks
document
  .getElementById("cookie-button")
  .addEventListener("click", handleCookieClick);
// Handle reset button clicks
document.getElementById("reset-button").addEventListener("click", function () {
  cookieCount = 0;
  cookiesPerSecond = 1;
  updateCookieCount();
  resetSound.play();
});

// Increase cookie count every second
setInterval(function () {
  cookieCount += cookiesPerSecond;
  updateCookieCount();
}, 1000);
// increases cookies persecond dependant on autoclicks bought
setInterval(function () {
  cookieCount += cookiesPerSecond + autoClicks;
}, 1000);

// Function to get shop upgrades from the API
async function getShopUpgrades() {
  try {
    const response = await fetch(
      "https://cookie-upgrade-api.vercel.app/api/upgrades"
    );
    const upgrades = await response.json();
    displayUpgrades(upgrades);
  } catch (error) {
    console.error("Error fetching upgrades:", error);
  }
}
// Function to display upgrades in the shop
function displayUpgrades(upgrades) {
  const upgradesList = document.getElementById("upgrades-list");
  upgradesList.innerHTML = "";

  upgrades.forEach(function (upgrade) {
    const upgradeDiv = document.createElement("div");
    upgradeDiv.className = "upgrade";

    const upgradeName = document.createElement("h3");
    upgradeName.innerText = upgrade.name;

    const upgradeCost = document.createElement("p");
    upgradeCost.innerText = "Cost: " + upgrade.cost + " cookie";

    const purchaseButton = document.createElement("button");
    purchaseButton.innerText = "Buy";
    purchaseButton.dataset.cost = upgrade.cost;
    purchaseButton.disabled = cookieCount < upgrade.cost;

    purchaseButton.addEventListener("click", function () {
      if (cookieCount >= upgrade.cost) {
        cookieCount -= upgrade.cost;
        autoClicks += 1; // Increase auto clicks
        updateCookieCount();
        displayUpgrades(upgrades); // Refresh upgrades display
      }
    });

    upgradeDiv.appendChild(upgradeName);
    upgradeDiv.appendChild(upgradeCost);
    upgradeDiv.appendChild(purchaseButton);
    upgradesList.appendChild(upgradeDiv);
  });
}

// When the page loads
document.addEventListener("DOMContentLoaded", function () {
  audio.muted = false;
  getShopUpgrades();
  updateCookieCount();
});
