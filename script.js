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

// Show or hide the volume control when the options button is clicked
optionsButton.addEventListener("click", function () {
  if (volumeControlContainer.style.display === "none") {
    volumeControlContainer.style.display = "block";
  } else {
    volumeControlContainer.style.display = "none";
  }
});

// Change the audio volume based on the selected option
volumeControl.addEventListener("change", function () {
  audio.volume = this.value;
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

// Function to update cookie count displayed on the screen
function updateCookieCount() {
  document.getElementById("cookie-count").innerText =
    "Cookie Count: " + cookieCount;
  document.getElementById("cookies-per-second").innerText =
    "Cookies per Second: " + cookiesPerSecond;
  localStorage.setItem("cookieCount", cookieCount);
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
// Increase cookies per second every 10 seconds
setInterval(function () {
  cookiesPerSecond++;
}, 10000);
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
    purchaseButton.disabled = cookieCount < upgrade.cost;

    purchaseButton.addEventListener("click", function () {
      if (cookieCount >= upgrade.cost) {
        cookieCount -= upgrade.cost;
        updateCookieCount();

        if (upgrade.effectType === "increaseCPS") {
          cookiesPerSecond += upgrade.effectAmount;
        } else if (upgrade.effectType === "reduceCost") {
          upgrade.cost = Math.floor(upgrade.cost * 0.9);
        }
        displayUpgrades(upgrades);
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
