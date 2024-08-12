const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const statusElement = document.getElementById('status');
const pointSummary = document.getElementById('point-summary');
const blurContainer = document.getElementById('blur-container');
const endPopup = document.getElementById('end-popup');
const correctAnswersSpan = document.getElementById('correct-answers');
const incorrectAnswersSpan = document.getElementById('incorrect-answers');

const questions = [
  {
    question: 'Was ist die Hauptstadt von Deutschland?',
    answers: [
      { text: 'Berlin', correct: true },
      { text: 'Paris', correct: false },
      { text: 'London', correct: false },
      { text: 'Rom', correct: false }
    ]
  },
  {
    question: 'Wer hat die Relativitätstheorie entwickelt?',
    answers: [
      { text: 'Isaac Newton', correct: false },
      { text: 'Albert Einstein', correct: true },
      { text: 'Galileo Galilei', correct: false },
      { text: 'Nikola Tesla', correct: false }
    ]
  },
  {
    question: 'Welches ist das größte Land der Welt?',
    answers: [
      { text: 'China', correct: false },
      { text: 'Russland', correct: true },
      { text: 'Kanada', correct: false },
      { text: 'USA', correct: false }
    ]
  },
  {
    question: 'Wie viele Planeten gibt es in unserem Sonnensystem?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true },
      { text: '12', correct: false },
      { text: '10', correct: false }
    ]
  },
  {
    question: 'Welcher Ozean grenzt an Afrika im Westen?',
    answers: [
      { text: 'Pazifischer Ozean', correct: false },
      { text: 'Arktischer Ozean', correct: false },
      { text: 'Indischer Ozean', correct: false },
      { text: 'Atlantischer Ozean', correct: true }
    ]
  },
  {
    question: 'Welche Farbe hat eine reife Banane?',
    answers: [
      { text: 'Grün', correct: false },
      { text: 'Rot', correct: false },
      { text: 'Gelb', correct: true },
      { text: 'Blau', correct: false }
    ]
  },
  {
    question: 'Wie viele Spieler gibt es in einer Fußballmannschaft?',
    answers: [
      { text: '7', correct: false },
      { text: '10', correct: false },
      { text: '13', correct: false },
      { text: '11', correct: true }
    ]
  },
  {
    question: 'Wer hat das Buch "Harry Potter" geschrieben?',
    answers: [
      { text: 'J.K. Rowling ', correct: true },
      { text: 'C.S Lewis', correct: false },
      { text: 'Lucy Maud Montgomery', correct: false },
      { text: 'J.R.R. Tolkien', correct: false }
    ]
  },
  {
    question: 'Welches ist das höchste Gebirge der Welt?',
    answers: [
      { text: 'Himalaya', correct: true },
      { text: 'Anden', correct: false },
      { text: 'Rocky Mountains', correct: false },
      { text: 'Alpen', correct: false }
    ]
  },
  {
    question: 'Was ist die Hauptstadt von Spanien?',
    answers: [
      { text: 'Madrid', correct: true },
      { text: 'Barcelona', correct: false },
      { text: 'Valencia', correct: false },
      { text: 'Sevilla', correct: false }
    ]
  },
  {
    question: 'Wie viele Zehen haben Elefanten im Schnitt an ihren Vorderfüßen?',
    answers: [
      { text: '2', correct: false },
      { text: '3', correct: false },
      { text: '4', correct: true },
      { text: '5', correct: false }
    ]
  },
  {
    question: 'Was war das erste Lebewesen, dass ins All geflogen ist?',
    answers: [
      { text: 'Hund', correct: false },
      { text: 'Affe', correct: true },
      { text: 'Mensch', correct: false },
      { text: 'Katze', correct: false }
    ]
  },
  {
    question: 'In welcher Stadt befindet sich der Sitz der Europäischen Kommission?',
    answers: [
      { text: 'Brüssel', correct: true },
      { text: 'Paris', correct: false },
      { text: 'Rom', correct: false },
      { text: 'Berlin', correct: false }
    ]
  },
  {
    question: 'Wie viele Zeitzonen gibt es auf der Erde?',
    answers: [
      { text: '12', correct: false },
      { text: '10', correct: false },
      { text: '16', correct: false },
      { text: '24', correct: true }
    ]
  },
  {
    question: 'Wie lautet der chemische Name für Wasser?',
    answers: [
      { text: 'CH4', correct: false },
      { text: 'CO2', correct: false },
      { text: 'H2O', correct: true },
      { text: 'H2SO4', correct: false }
    ]
  },
  {
    question: 'In welchem Jahr fand die erste Mondlandung statt?',
    answers: [
      { text: '1969', correct: true },
      { text: '1970', correct: false },
      { text: '1968', correct: false },
      { text: '1971', correct: false }
    ]
  },
  {
    question: 'Was ist die Hauptzutat in Schokolade?',
    answers: [
      { text: 'Milch', correct: false },
      { text: 'Kakao', correct: true },
      { text: 'Ei', correct: false },
      { text: 'Zucker', correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

hidePopup();

showPointSummary();

showQuestion(questions[currentQuestionIndex]);

function showPointSummary() {
  pointSummary.innerHTML = `Richtige Antworten: ${correctAnswers}<br>Falsche Antworten: ${incorrectAnswers}`;
  pointSummary.style.display = 'block';
}

function selectAnswer(correct, button) {
  if (correct) {
    button.classList.add('correct');
    correctAnswers++;
  } else {
    button.classList.add('wrong');
    incorrectAnswers++;
  }
  disableButtons();
  showStatus(correct);
  showPointSummary();
}

function disableButtons() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.disabled = true;
  });
}

function showStatus(correct) {
  statusElement.innerText = correct ? 'Richtig!' : 'Falsch!';
  statusElement.style.color = correct ? '#28a745' : '#dc3545';
  setTimeout(() => {
    statusElement.innerText = '';
  }, 1000);
  setTimeout(() => {
    nextQuestion();
  }, 1000);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
  } else {
    showBlurBackground();
    showEndQuizPopup();
  }
}

function showProgress() {
  const progressElement = document.getElementById('progress');
  progressElement.innerText = `Frage ${currentQuestionIndex + 1} von ${questions.length}`;
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  answerButtonsElement.innerHTML = '';
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer.correct, button));
    answerButtonsElement.appendChild(button);
  });
  showProgress();
}

function showBlurBackground() {
  blurContainer.style.display = 'block';
}

function hideBlurBackground() {
  blurContainer.style.display = 'none';
}

function showEndQuizPopup() {
  if (currentQuestionIndex === questions.length) {
    endPopup.style.display = 'block';
    correctAnswersSpan.textContent = correctAnswers;
    incorrectAnswersSpan.textContent = incorrectAnswers;
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  showQuestion(questions[currentQuestionIndex]);
  hidePopup();
  hideBlurBackground();
  showPointSummary();
}

function hidePopup() {
  endPopup.style.display = 'none';
}

const menuButton = document.getElementById('menu-button');
const menuContent = document.getElementById('menu-content');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', toggleMenu);
menu.addEventListener('click', (e) => {
  if (!menu.contains(e.target)) {
    menuContent.style.display = 'none';
    menu.classList.remove('open');
  }
});

function toggleMenu() {
  if (menuContent.style.display === 'block') {
    menuContent.style.display = 'none';
    menu.classList.remove('open');
  } else {
    menuContent.style.display = 'block';
    menu.classList.add('open');
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  hidePopup();
  showQuestion(questions[currentQuestionIndex]);
  hideBlurBackground();
  showPointSummary();
}

const restartButton = document.getElementById('restart-button');

restartButton.addEventListener('click', restartQuiz);

function endQuiz() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  hidePopup();
  showQuestion(questions[currentQuestionIndex]);
  hideBlurBackground();
  showPointSummary();
}
