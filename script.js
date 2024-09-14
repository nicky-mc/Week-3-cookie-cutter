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
optionsButton.addEventListener("click", function () {
  volumeControlContainer.style.display =
    volumeControlContainer.style.display === "none" ? "block" : "none";
});

volumeControl.addEventListener("change", function () {
  audio.volume = this.value;
});

let isMusicPlaying = true;
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

let cookieCount = parseInt(localStorage.getItem("cookieCount")) || 0;
let cookiesPerSecond = 1;

function updateCookieCount() {
  document.getElementById(
    "cookie-count"
  ).innerText = `Cookie Count: ${cookieCount}`;
  document.getElementById(
    "cookies-per-second"
  ).innerText = `Cookies per Second: ${cookiesPerSecond}`;
  localStorage.setItem("cookieCount", cookieCount);
}
//DEBOUNCE FUNCTION TO TRY AND CIRCUMVENT AN ERROR WHEN AUTO CLICKER IS PURCHASED AND BY PASSES THE SOUND THAT WOULD NORMALLY HAPPEN WHEN THE USER CLICKS THE COOKIE BUTTON
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
const handleCookieClick = debounce(() => {
  clickSound.currentTime = 0;
  clickSound.play();
  cookieCount++;
  updateCookieCount();
  animateCookieClick();
}, 100);
document
  .getElementById("cookie-button")
  .addEventListener("click", handleCookieClick);
document.getElementById("reset-button").addEventListener("click", function () {
  cookieCount = 0;
  cookiesPerSecond = 1;
  updateCookieCount();
  resetSound.play();
});

setInterval(() => {
  cookieCount += cookiesPerSecond;
  updateCookieCount();
}, 1000);

setInterval(() => {
  cookiesPerSecond++;
}, 10000);
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
function displayUpgrades(upgrades) {
  const upgradesList = document.getElementById("upgrades-list");
  upgradesList.innerHTML = "";

  upgrades.forEach((upgrade) => {
    const upgradeDiv = document.createElement("div");
    upgradeDiv.className = "upgrade";
    const upgradeName = document.createElement("h3");
    upgradeName.innerText = upgrade.name;

    const upgradeCost = document.createElement("p");
    upgradeCost.innerText = `Cost: ${upgrade.cost} cookie`;

    const purchaseButton = document.createElement("button");
    purchaseButton.innerText = "Buy";
    purchaseButton.disabled = cookieCount < upgrade.cost;
    purchaseButton.addEventListener("click", function () {
      if (cookieCount >= upgrade.cost) {
        cookieCount -= upgrade.cost;
        updateCookieCount();
        if (upgrade.effectType === "increaseCPS") {
          cookiesPerSecond += upgrade.effectAmount; //
        } else if (upgrade.effectType === "reduceCost") {
          upgrade.cost = Math.floor(upgrade.cost * 0.9);
        }
        displayUpgrades(upgrades);
        animateUpgradePurchase(upgrade.name);
      }
    });
    upgradeDiv.appendChild(upgradeName);
    upgradeDiv.appendChild(upgradeCost);
    upgradeDiv.appendChild(purchaseButton);
    upgradesList.appendChild(upgradeDiv);
  });
}
function animateCookieClick() {
  const cookieButton = document.getElementById("cookie-button");
  cookieButton.classList.add("clicked");
  setTimeout(() => {
    cookieButton.classList.remove("clicked");
  }, 100);
}
function animateUpgradePurchase(upgradeName) {
  const message = document.createElement("div");
  message.className = "upgrade-message";
  message.innerText = `Purchased: ${upgradeName}`;
  document.body.appendChild(message);
  setTimeout(() => {
    message.remove();
  }, 2000);
}
document.addEventListener("DOMContentLoaded", function () {
  audio.muted = false;
  getShopUpgrades();
  updateCookieCount();
});
