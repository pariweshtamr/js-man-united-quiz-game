const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What year was Manchester United founded?",
    choice1: "1800",
    choice2: "1832",
    choice3: "1878",
    choice4: "1904",
    answer: 3,
  },
  {
    question: "What is on the club's logo?",
    choice1: "A devil",
    choice2: "A swan",
    choice3: "A cricket",
    choice4: "A mars bar",
    answer: 1,
  },
  {
    question: "What was the club originally called?",
    choice1: "F.C. United of Manchester",
    choice2: "Newton Heath LYR ",
    choice3: "Manchester North End F.C.",
    choice4: "Northwich Manchester Villa F.C.",
    answer: 2,
  },
  {
    question: "What is the name of Manchester United's home ground?",
    choice1: "Bramall Lane",
    choice2: "Elland Road",
    choice3: "Old Trafford",
    choice4: "St James's Park",
    answer: 3,
  },
  {
    question: "Who was the manager before Ole Gunnar Solskjaer?",
    choice1: "Jose Mourinho",
    choice2: "Louis Van Gaal",
    choice3: "David Moyes",
    choice4: "Alex Ferguson",
    answer: 1,
  },
  {
    question: "What is Manchester United's nickname?",
    choice1: "The Reds",
    choice2: "The Blades",
    choice3: "Red Devils",
    choice4: "The Toffees",
    answer: 3,
  },
  {
    question: "Who is Manchester United's all-time top goalscorer?",
    choice1: "Wayne Rooney",
    choice2: "Bobby Chalrton",
    choice3: "Ryan Giggs",
    choice4: "Mark Hughes",
    answer: 1,
  },
  {
    question: "What nickname did United fans give to Eric Cantona?",
    choice1: "God",
    choice2: "The Magician",
    choice3: "The Flying Frenchman",
    choice4: "King Eric",
    answer: 4,
  },
  {
    question: "What year did Manchester United sign Cristiano Ronaldo?",
    choice1: "2000",
    choice2: "2008",
    choice3: "2005",
    choice4: "2003",
    answer: 4,
  },
  {
    question:
      "Which year did Manchester United win a Treble for the first time?",
    choice1: "1968",
    choice2: "1999",
    choice3: "2008",
    choice4: "2002",
    answer: 2,
  },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("./end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
