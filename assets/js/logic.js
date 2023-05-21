// variables to keep track of quiz state
var currentQuestionIndex = 0;
//time left value here
// var time = ;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById('');
var timerEl = document.getElementById('');
var choicesEl = document.getElementById('');
var submitBtn = document.getElementById('');
var startBtn = document.getElementById('');
var initialsEl = document.getElementById('');
var feedbackEl = document.getElementById('');


function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById('');
  startScreenEl.setAttribute('class', '');

  // un-hide questions section
  questionsEl.removeAttribute('');

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById('');
  titleEl.textContent = ; //think dot notation

  // clear out any old question choices
  choicesEl.innerHTML = '';

  // loop over choices
  for (var i = 0; i < ; i++) {
    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    // display on the page
    choicesEl.appendChild();
  }
}

function questionClick(event) {
  var buttonEl = event.target;

  // if the clicked element is not a choice button, do nothing.
  if (!buttonEl.matches('.choice')) {
    return;
  }

  // check if user guessed wrong
  if () {



    // penalize time
    
  
   

    // display new time on page
   

  // flash right/wrong feedback on page for half a second
 

  // move to next question
  

  // check if we've run out of questions or if time ran out?
  if () {

    //if it did ???

  } else {
    
    // if it didnt??
  }
}

function quizEnd() {
  // stop timer
 
  // show end screen
  var endScreenEl = document.getElementById('');
  endScreenEl.removeAttribute('class');

  // show final score
  var finalScoreEl = document.getElementById('');
  finalScoreEl.textContent = time;

  // hide questions section
}

function clockTick() {
  // update time
  // decrement the variable we are using to track time
  timerEl.textContent = ; // update out time

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if () {

    // get saved scores from localstorage, or if not any, set to empty array
    
    var highscores =
      JSON.parse() /* what would go inside the PARSE??*/ || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(/* What would we put inside STRINGIFY? */));

    // redirect to next page
    window.location.href = '';
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on element containing choices
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;
