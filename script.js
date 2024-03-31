const randomSentence_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");

const typeSound = new Audio("./audio/audio_typing-sound.mp3");
const wrongSound = new Audio("./audio/audio_wrong.mp3");
const correctSound = new Audio("./audio/audio_correct.mp3");

typeInput.addEventListener("input", () => {
  typeSound.play();
  typeSound.currentTime = 0;

  const sentenceArray = typeDisplay.querySelectorAll("span");
  const arrayValue = typeInput.value.split("");
  let correct = true;
  sentenceArray.forEach((letterSpan, index) => {
    if (arrayValue[index] == null) {
      letterSpan.classList.remove("correct");
      letterSpan.classList.remove("incorrect");
      correct = false;
    } else if (letterSpan.innerText === arrayValue[index]) {
      letterSpan.classList.add("correct");
      letterSpan.classList.remove("incorrect");
    } else {
      letterSpan.classList.add("incorrect");
      letterSpan.classList.remove("correct");

      wrongSound.volume = 0.2;
      wrongSound.play();
      wrongSound.currentTime = 0;
      correct = false;
    }
  });
  if (correct == true) {
    correctSound.play();
    correctSound.currentTime = 0;
    displayNextSentence();
  }
});

function getRandomSentence() {
  return fetch(randomSentence_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function displayNextSentence() {
  const sentence = await getRandomSentence();

  typeDisplay.innerText = "";

  let oneWord = sentence.split("");
  console.log(oneWord);
  oneWord.forEach((letter) => {
    const letterSpan = document.createElement("span");
    letterSpan.innerText = letter;
    typeDisplay.appendChild(letterSpan);
  });
  typeInput.value = "";

  StartTimer();
}

let startTime;
let originTime = 30;
function StartTimer() {
  timer.innerText = originTime;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = originTime - getTimerTime();
    if (timer.innerText <= 0) TimeUp();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

function TimeUp() {
  displayNextSentence();
}

displayNextSentence();
