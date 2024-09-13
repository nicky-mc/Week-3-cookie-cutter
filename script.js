console.log("do you like cookies?");
const audio = document.querySelector(".backingTrack");
const optionsButton = document.getElementById("options-button");
const volumeControl = document.getElementById("volume-control");
const volumeControlContainer = document.getElementById(
  "volume-control-container"
);
const clickSound = document.getElementById("click-sound");
const resetSound = document.getElementById("reset-sound");
audio.volume = 1;
audio.muted = false;
optionsButton.addEventListener("click", function () {
  if (volumeControlContainer.style.display === "none") {
    volumeControlContainer.style.display = "block";
  } else {
    volumeControlContainer.style.display = "none";
  }
});
volumeControl.addEventListener("change", function () {
  audio.volume = this.value;
  audio.muted == 0;
});

//we need to store two global values: cookie count and cookies per second
//choose one way, the one that's easier for you
let cookieCount = 0;
function updateCookieCount() {
  document.getElementById(
    "cookie-count"
  ).innerText = `Cookie Count: ${cookieCount}`;
}
function handleCookieClick() {
  clickSound.currentTime = 0;
  clickSound.play();
  cookieCount++;
  updateCookieCount();
}
document
  .getElementById("cookie-button")
  .addEventListener("click", handleCookieClick);
document.getElementById("reset-button").addEventListener("click", function () {
  cookieCount = 0;
  updateCookieCount();
  resetSound.play();
});

let cookiesPerSecond = 1;
setInterval(() => {
  cookieCount += cookiesPerSecond;
  updateCookieCount();
}, 1000);

//if you choose the stats object, you don't need the global variables above
let stats = {
  cookieCount: 0,
  cookiesPerSecond: 0,
};

//DOM manipulation
//select the DOM elements (buttons, imgs, p, ...)

//a way to store the shop upgrades that come from the API
//let shopUpgrades = ["https://cookie-upgrade-api.vercel.app/api/upgrades"];

//fetch the items from the API --> https://cookie-upgrade-api.vercel.app/api/upgrades
//function getShopUpgrades() {
//try {
//const response = await fetch(
//  "https://cookie-upgrade-api.vercel.app/api/upgrades"
//);
//const upgrades = await response.json();
//displayUpgrades(shopUpgrades);
//} catch (error) {}
//(error) => console.error("error fetching upgrades:", error);
//}
//function displayUpgrades(upgrades) {
//const upgradesList = document.getElementById("upgrade-list");
//upgradesList.innerHTML = "";
//upgrades.forEach(upgrade => {
//const upgradeDiv = document.createElement("div");
//upgradeDiv.className = "upgrade";
//const upgradeName = document.createElement("h3");
//upgradeName.innerText = upgrade.name;
//const upgradeCost = document.createElement("p");
//upgradeCost.innerText = `Cost: ${upgrade.cost} cookie`;
//const purchaseButton = document.createElement("button");
//purchaseButton.innerText = "buy";
//purchaseButton.disabled = cookieCount < upgradeCost;
//purchaseButton.addEventListener("click", function () {
//if (cookieCount >= upgrade.cost) {
//cookieCount -= upgrade.cost;
//updateCookieCount();
//isplayUpgrades(shopUpgrades);
//}
//});
//fetch the dafutaconst
//translate it into JSON
//PUSH the items into the shopUpgrades array above
//}

//an event listener to click on the cookie button
//select the cookie img or button
//write your event handler and event listener

//we need a timer that increases the cookieCount value by one every second

//I want to increase the value of cookieCount by one every second
//I want to update the value displayed on the page (this task can also be a separate function, for example, updateCookieCount(), and you would call this function inside the setInterval function)
//   updateCookieCount();
//I want to store this value in local storage (this task can also be a separate function, for example, storeLocalStorage(), and you would call this function inside the setInterval function)
//   storeLocalStorage()

// function updateCookieCount() {
//I update the cookieCount value (this is just one option)
// }

// function storeLocalStorage(){
// I store the values in local storage (this is just one option)
// }

//==============================================
//extra function blocks to give you other ideas
//these building blocks are just possible solutions to probles you might find

function renderShopUpgrades() {
  //create DOM elements
  //you will use a loop or array method
  shopUpgrades.forEach(function (upgrade) {
    //for each item in the array, assign the value to a DOM element
    //append the element to the DOM
  });
}

function saveLocalStorage() {
  //a method that turns your data into string soup
  //a method to set the data into key and values in local storage
}
