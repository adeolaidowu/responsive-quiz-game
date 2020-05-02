import questions from "./questions.js";

const randomNum = Math.floor(Math.random() * 6);
const randomQuestion = questions[randomNum];
const questionNumHeading = document.querySelector(".question-number");
const questionContainer = document.querySelector(".question");
const olNode = document.querySelector(".options__list");
const wrongScoresPara = document.querySelector(".scores__wrong");
const rightScoresPara = document.querySelector(".scores__right");
let playerAnswer;
let questionNum = 1;
let rightScore = 0;
let wrongScore = 0;
console.log(randomQuestion);
const submitBtn = document.querySelector(".submit");
const startBtn = document.querySelector(".start");

const pickRandomQuestion = () => {
  const randomNum = Math.floor(Math.random() * 6);
  const randomQuestion = questions[randomNum];
  return randomQuestion;
};

const displayRandomQuestionPage = (que) => {
  questionNumHeading.innerText = `Question ${questionNum}`;
  rightScoresPara.innerText = `Correct: ${rightScore}`;
  wrongScoresPara.innerText = `Wrong: ${wrongScore}`;
  questionContainer.innerText = que.question;
  que.options.forEach((option) => {
    let listItem = document.createElement("li");
    listItem.innerText = option;
    listItem.classList.add("options__item");
    olNode.appendChild(listItem);
    //console.log(listItem);
  });
};
//displayRandomQuestion();

const playGame = () => {
  const randomQuestion = pickRandomQuestion();
  displayRandomQuestionPage(randomQuestion);
  const listItems = document.querySelectorAll(".options__item");
  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      playerAnswer = item.innerText;
      console.log(playerAnswer);
      playerAnswer && checkGame(playerAnswer, randomQuestion);
    });
  });
};

const checkGame = (playerResponse, question) => {
  if (playerResponse == question.answer) {
    rightScore++;
  } else {
    wrongScore++;
  }
};

startBtn.addEventListener("click", () => {
  playGame();
  startBtn.classList.add("hide");
});

submitBtn.addEventListener("click", () => {
  olNode.innerHTML = "";
  questionNum++;
  playGame();
});
