// sety the variables to keep track of quiz's current state
var currentQuestionIndex = 0;
//set how much time is given for the quiz
var time = 100;
var timerId;

// set variable to make references in DOM
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
var feedbadEl = document.getElementById('feedbad');
var audioCorrect = document.getElementById('correct');
var audioIncorrect = document.getElementById('incorrect');

audioCorrect.pause();
audioIncorrect.pause();

function startQuiz() {
  // hide the start screen once quiz starts
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class', 'hide');

  // un-hide questions
  questionsEl.removeAttribute('class');

  // start timer and set each interval to 1 second or 1000ms
  timerId = setInterval(clockTick, 1000);

  // show the starting time on page
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question by locating its id
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title; //think dot notation

  // erase any old question choices
  choicesEl.innerHTML = '';

  // loop over choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    // display choices on the page
    choicesEl.appendChild(choiceNode);
  }
}

function questionClick(event) {
  var buttonEl = event.target;

  if (!buttonEl.matches('.choice')) {
    return;
  }

  // check if user guessed wrong
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {



    // penalize time
    time -= 10;



    // display updated time on page
    timerEl.textContent = time;
  }
  // here I made an animation to fade in and out of the right/wrong answers by changing their classes.
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    setTimeout(function () { feedbadEl.setAttribute("class", "fade"); audioIncorrect.load(); }, 500)
  }
  else {
    setTimeout(function () { feedbackEl.setAttribute("class", "fade"); audioCorrect.load(); }, 500)
  }
  feedbackEl.setAttribute("class", "hide");
  feedbadEl.setAttribute("class", "hide");

  //next question
  currentQuestionIndex++;

  // check if we've run out of questions or if time ran out?
  if (time <= 0 || currentQuestionIndex === questions.length) {
    
    quizEnd()

  } else {

    // if it didnt??
    getQuestion()
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);
  // show end screen
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');

  // show final score page
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  // hide questions
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update the time
  // decrement the variable we are using to track time
  timerEl.textContent = time--; // update out time

  // check if ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of the input box
  var initials = initialsEl.value.trim();

  // make sure to check if the value was empty
  if (initials !== "") {

    // get saved scores from LocalStorage, or if not any, set to empty array

    var highscores =
      JSON.parse(window.localStorage.getItem("scoreslist")) /* what would go inside the PARSE??*/ || [];

    // format new score object for the current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to LocalStorage
    highscores.push(newScore);
    window.localStorage.setItem('scoreslist', JSON.stringify(highscores));

    // redirect to the highscores page
    window.location.href = 'highscores.html';
  }
}

function checkForEnter(event) {
  // define the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

// user clicks the button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks the button to start quiz
startBtn.onclick = startQuiz;

// user clicks on element containing muiltiple choices
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;
