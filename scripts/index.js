import allQuestions from "./questions.js";

const errorMsg = document.querySelector(".error-msg");
const questionNumHeading = document.querySelector(".question-number");
const questionContainer = document.querySelector(".question");
const olNode = document.querySelector(".options__list");
const wrongScoresPara = document.querySelector(".scores__wrong");
const rightScoresPara = document.querySelector(".scores__right");
const submitBtn = document.querySelector(".submit");
const startBtn = document.querySelector(".start");
const resultPara = document.querySelector(".result");
const introDiv = document.querySelector(".intro");
const mainTag = document.querySelector(".main");
const scoresDiv = document.querySelector(".scores");
let playerAnswer = "";
let questionNum = 1;
let currentIndex = 0;
let rightScore = 0;
let wrongScore = 0;
let gameQuestions;
//function to generate 5 random questions
const getRandomQuestions = (questions) => {
  const randomQuestions = [];
  const questionsLength = questions.length;
  for (let i = 0; i < questionsLength; i++) {
    const randomNum = Math.floor(Math.random() * questionsLength);
    if (!randomQuestions.includes(questions[randomNum])) {
      randomQuestions.push(questions[randomNum]);
    }
    if (randomQuestions.length === 5) break;
  }
  return randomQuestions;
};

//let randomQuestions = getRandomQuestions(questions);

// function that populates page with question and other html elements
const displayRandomQuestionPage = (que) => {
  questionNumHeading.innerText = `Question ${questionNum} of 5`;
  rightScoresPara.innerText = `Correct: ${rightScore}`;
  wrongScoresPara.innerText = `Wrong: ${wrongScore}`;
  questionContainer.innerText = que.question;
  que.options.forEach((option) => {
    let listItem = document.createElement("li");
    listItem.innerText = option;
    listItem.classList.add("options__item");
    olNode.appendChild(listItem);
  });
};
//function to prepare DOM elements for user interaction
const setUpPage = (questionsArg, indexArg) => {
  displayRandomQuestionPage(questionsArg[indexArg]);
  //if player has not made a selection disable next button
  playerAnswer === "" && submitBtn.setAttribute("disabled", true);

  const listItems = document.querySelectorAll(".options__item");
  //add a click listener for all options to know when player makes selection
  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (playerAnswer !== "") {
        errorMsg.innerText =
          "You can only answer this question once. Don't be a thief!";
      } else {
        playerAnswer = item.innerText;
        checkGame(playerAnswer, questionsArg[indexArg], item, listItems);
        submitBtn.removeAttribute("disabled");
      }
    });
  });
};

//function that plays a round of the game
const playGame = () => {
  // debugger;
  setUpPage(gameQuestions, currentIndex);
  //button to move to next question
  submitBtn.addEventListener("click", () => {
    if (playerAnswer !== "") {
      currentIndex++;
      //debugger;
      olNode.innerHTML = "";
      playerAnswer = "";
      errorMsg.innerText = "";
      //debugger;
      questionNum++;
      setUpPage(gameQuestions, currentIndex);
    }
  });
};

//function to validate player answer
const checkGame = (playerResponse, question, listItem, listItems) => {
  if (playerResponse == question.answer) {
    rightScore++;
    listItem.style.backgroundColor = "mediumseagreen";
    listItem.style.color = "#f7f7f7";
  } else {
    wrongScore++;
    const answer = question.answer;
    listItems.forEach((item) => {
      if (item.innerText === answer) {
        item.style = "background-color: mediumseagreen; color: #f7f7f7;";
      }
    });
    listItem.style = "background-color: crimson; color: #f7f7f7;";
  }
  if (rightScore + wrongScore === 5) {
    rightScore > 2.5
      ? (resultPara.innerText = `You scored ${rightScore}/5  🎊 😊 🎊. Brilliant attempt!!`)
      : (resultPara.innerText = `You scored ${rightScore}/5 😢😢. You can do better`);
    startBtn.innerText = "Play Again";
    resultPara.classList.remove("hide");
    currentIndex = 0;
    endGame();
  }
};

//function to end game
const endGame = () => {
  startBtn.classList.remove("hide-opacity");

  questionNumHeading.style.opacity = "0";
  questionContainer.style.opacity = "0";
  document.querySelector(".page-overlay").style.height = "100vh";
  startBtn.classList.add("btn");
};

//set default values
const setDefault = () => {
  olNode.innerHTML = "";
  playerAnswer = "";
  errorMsg.innerText = "";
  rightScore = 0;
  wrongScore = 0;
  questionNum = 1;
  scoresDiv.style.opacity = "0";
  submitBtn.style.opacity = "0";
  //mainTag.style.display = "none";
};

//button to start playing game
startBtn.addEventListener("click", () => {
  setDefault();
  gameQuestions = getRandomQuestions(allQuestions);
  document.querySelector(".page-overlay").style.height = "0";
  mainTag.style.opacity = "1";
  mainTag.classList.remove("hide");
  //startBtn.classList.remove("btn");
  resultPara.classList.add("hide");
  introDiv.classList.add("hide");
  startBtn.classList.add("hide-opacity");
  setTimeout(() => {
    //debugger;
    playGame();
    submitBtn.classList.remove("hide");
    scoresDiv.style.opacity = "1";
    submitBtn.style.opacity = "1";
    questionNumHeading.style.opacity = "1";
    questionContainer.style.opacity = "1";
  }, 1000);
});
