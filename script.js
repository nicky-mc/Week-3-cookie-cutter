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
// this ensures that the volume is saved when the page is reloaded
document.addEventListener("DOMContentLoaded", function () {
  const savedVolume = localStorage.getItem("audioVolume") || "1";
  volumeControl.value = savedVolume;
  audio.volume = savedVolume;
  clickSound.volume = savedVolume;
  resetSound.volume = savedVolume;
});

let isMusicPlaying = true;

// Toggle music play and pause when the button is clicked though the music does not play upon loading the page it must be toggled on
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
// this allows the user to toggle between light and dark mode
document.getElementById("theme-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  document
    .querySelectorAll(".header, h2, button, .options-menu")
    .forEach(function (element) {
      element.classList.toggle("dark-theme");
      element.classList.toggle("light-theme");
    });
});
// this is the cookie count and cookies per second
let cookieCount = parseInt(localStorage.getItem("cookieCount")) || 0;
let cookiesPerSecond = 1;
let autoClicks = 0;
let cookiesPerClick = 1;
// these upgrades are the upgrades that are displayed in the shop and the cost and the effect of the upgrades
const upgrades = {
  autoClicker: {
    cost: 100,
    effect: function () {
      setInterval(() => {
        cookieCount++;
        updateCookieCount();
      }, 1000);
    },
  },

  enhancedOven: {
    cost: 500,
    effect: function () {
      cookiesPerSecond *= 2;
    },
  },
  cookieFarm: {
    cost: 1000,
    effect: function () {
      cookiesPerSecond *= 4;
    },
  },
  robotBaker: {
    cost: 2000,
    effect: function () {
      cookiesPerSecond *= 5;
    },
  },
  cookieFactory: {
    cost: 5000,
    effect: function () {
      cookiesPerSecond *= 6;
    },
  },
  magicFlour: {
    cost: 10000,
    effect: function () {
      cookiesPerSecond *= 7;
    },
  },
  timeMachine: {
    cost: 20000,
    effect: function () {
      cookiesPerSecond *= 10;
    },
  },
  quantumOven: {
    cost: 50000,
    effect: function () {
      cookiesPerSecond *= 12;
    },
  },
  alienTechnology: {
    cost: 100000,
    effect: function () {
      cookiesPerSecond *= 15;
    },
  },
  interDimensionalBaker: {
    cost: 200000,
    effect: function () {
      cookiesPerSecond *= 20;
    },
  },
};
function purchaseUpgrade(upgradeName) {
  const upgrade = upgrades[upgradeName];
  if (cookieCount >= upgrade.cost) {
    cookieCount -= upgrade.cost;
    updateCookieCount();
    upgrade.effect();
    document.getElementById(`${upgradeName}-button`).disabled = true;
  } else {
    alert("Not enough cookies!");
  }
}
// Function to update cookie count displayed on the screen and in the local storage
function updateCookieCount() {
  document.getElementById("cookie-count").innerText =
    "Cookie Count: " + cookieCount;
  document.getElementById("cookies-per-second").innerText =
    "Cookies per Second: " + (cookiesPerSecond + autoClicks);
  localStorage.setItem("cookieCount", cookieCount);
  updateUpgradeButtons();
}

// Function to update cookie count displayed on the screen and in the local storage

function updateCookieCount() {
  document.getElementById("cookie-count").innerText =
    "Cookie Count: " + cookieCount;
  document.getElementById("cookies-per-second").innerText =
    "Cookies per Second: " + (cookiesPerSecond + autoClicks);
  localStorage.setItem("cookieCount", cookieCount);
  updateUpgradeButtons();
}
// Function to update the upgrade buttons in the shop based on the cookie count
function updateUpgradeButtons() {
  const upgradeButtons = document.querySelectorAll(".upgrade button");
  upgradeButtons.forEach((button) => {
    const cost = parseInt(button.dataset.cost);
    button.disabled = cookieCount < cost;
  });
}
// Debounce function to handle rapid clicks on the cookie button to prevent the sound from overlapping
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
// this is the event listener for the cookie button and it plays a sound when the button is clicked
const handleCookieClick = debounce(function () {
  clickSound.currentTime = 0;
  clickSound.play();
  cookieCount++;
  updateCookieCount();
}, 100);
// this is the event listener for the cookie button
document
  .getElementById("cookie-button")
  .addEventListener("click", handleCookieClick);
// tjis is the event listener for the reset button and it resets the cookie count to 0
document.getElementById("reset-button").addEventListener("click", function () {
  cookieCount = 0;
  cookiesPerSecond = 1;
  updateCookieCount();
  resetSound.play();
});

// Increase cookie count every second and update the cookie count displayed on the screen
setInterval(function () {
  cookieCount += cookiesPerSecond;
  updateCookieCount();
}, 1000);
// increases cookies persecond dependant on autoclicks bought when the page is loaded
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
  // this is the upgrades that are displayed in the shop
  upgrades.forEach(function (upgrade) {
    const upgradeDiv = document.createElement("div");
    upgradeDiv.className = "upgrade";
    // this is the name of the upgrades
    const upgradeName = document.createElement("h3");
    upgradeName.innerText = upgrade.name;
    // this is the cost of the upgrades
    const upgradeCost = document.createElement("p");
    upgradeCost.innerText = "Cost: " + upgrade.cost + " cookie";
    // this is the purchase button for the upgrades
    const purchaseButton = document.createElement("button");
    purchaseButton.innerText = "Buy";
    purchaseButton.dataset.cost = upgrade.cost;
    purchaseButton.disabled = cookieCount < upgrade.cost;
    // this is the event listener for the purchase button
    purchaseButton.addEventListener("click", function () {
      if (cookieCount >= upgrade.cost) {
        cookieCount -= upgrade.cost;
        autoClicks += 1; // Increase auto clicks
        updateCookieCount();
        displayUpgrades(upgrades); // Refresh upgrades display
      }
    });
    // this appends the upgrades to the shop
    upgradeDiv.appendChild(upgradeName);
    upgradeDiv.appendChild(upgradeCost);
    upgradeDiv.appendChild(purchaseButton);
    upgradesList.appendChild(upgradeDiv);
  });
}

// this function is called when the page is loaded it ensures that the audio is not muted and that the shop upgrades are displayed on the screen and the cookie count is updated
document.addEventListener("DOMContentLoaded", function () {
  audio.muted = false;
  getShopUpgrades();
  updateCookieCount();
});
