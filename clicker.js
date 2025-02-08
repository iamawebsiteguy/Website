const stats = document.getElementById("stats");
let cpc = parseInt(1);
var notyf = new Notyf({
  position: { x: "right", y: "top" },
});

let aantalKeerGeklikt = 0;
let achievements = parseInt(0);
let rangOrdeLijst = {
  1: "1x geklikt",
  5: "5x geklikt",
  20: "20x geklikt",
  50: "50x geklikt",
  100: "100x geklikt",
  200: "200x geklikt",
  500: "500x geklikt",
  1000: "1000x geklikt",
  2000: "2000x geklikt",
  3000: "3000x geklikt",
  5000: "5000x geklikt",
  7500: "7500x geklikt",
  10000: "10000x geklikt",
  15000: "15000x geklikt",
};

let luilakAchievements = {
  1: "1 seconden niets gedaan",
  2: "2 seconden niets gedaan",
  3: "3 seconden niets gedaan",
  4: "4 seconden niets gedaan",
  5: "5 seconden niets gedaan",
  6: "6 seconden niets gedaan",
  7: "7 seconden niets gedaan",
  8: "8 seconden niets gedaan",
  9: "9 seconden niets gedaan",
  10: "10 seconden niets gedaan",
  60: "1 minuut niets gedaan",
  300: "5 minuten niets gedaan",
  900: "15 minuten niets gedaan",
  1800: "30 minuten niets gedaan",
  3600: "1 uur niets gedaan",
};

let timerHandles = [];
clicker.addEventListener("click", function () {
  aantalKeerGeklikt += cpc;

  let rangOrde = null;
  for (let key in rangOrdeLijst) {
    if (aantalKeerGeklikt == key) {
      rangOrde = rangOrdeLijst[key];
    }
  }

  if (rangOrde) {
    showMessage(`Je hebt nu een nieuwe achievement: ${rangOrde}`);

    delete rangOrdeLijst[aantalKeerGeklikt];
  }

  for (let key in timerHandles) {
    clearTimeout(timerHandles[key]);
  }

  for (let key in luilakAchievements) {
    let timeout = setTimeout(function () {
      showMessage(`Je hebt nu een nieuwe achievement: ${luilakAchievements[key]}`);

      delete luilakAchievements[key];
    }, key * 1000);

    timerHandles[key] = timeout;
  }
});

function showMessage(message) {
  notyf.success(message);
  achievements = achievements + 1;
}

let upgr1 = "no";
let upgr2 = "no";
setInterval(function() {
  stats.innerHTML = `Stats: <br> clicks: ${aantalKeerGeklikt} <br> Achievements: ${achievements}`;
  if (achievements === 25 && upgr2 === "no") {
    notyf.success("upgrade: 5 clicks per click");
    upgr2 = "yes";
    cpc = cpc + 3;
  }
  if (achievements === 10 && upgr1 === "no") {
    notyf.success("upgrade: 2 clicks per click");
    upgr1 = "yes";
    cpc = cpc + 1;
  }
}, 1000);