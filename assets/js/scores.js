function printHighscores() {
  // either get scores from localstorage or set to empty array
  var highscores = JSON.parse(window.localStorage.getItem('scoreslist')) || [];

  // sort highscores by score property in descending order by using the sort method. 
  highscores.sort(function (a, b) {
    return b.score - a.score;
  })

  for (var i = 0; i < highscores.length; i += 1) {
    // create li tag for each high score logged
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

    // display on page
    var olEl = document.getElementById('scoreslist');
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem('scoreslist');
  window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

// run function when page loads
printHighscores();
