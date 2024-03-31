const randomSentence_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");

function getRandomSentence() {
  return fetch(randomSentence_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function displayNextSentence() {
  const sentence = await getRandomSentence();
  //   console.log(sentence);

  typeDisplay.innerText = "";

  let oneWord = sentence.split("");
  //   console.log(oneWord);
  oneWord.forEach((letter) => {
    const letterSpan = document.createElement("span");
    letterSpan.innerText = letter;
    typeDisplay.appendChild(letterSpan);
    letterSpan.classList.add("correct");
  });
  //   console.log(oneWord);
  typeInput.innerText = "";
}

displayNextSentence();
