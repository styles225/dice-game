/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his TOTAL score. After that, it's the next player's turn
- The first player to reach 10 points on TOTAL score wins the game
*/

// model
var model = (function() {
  var current, activePlayer;
  current = 0;
  activePlayer = 0;
  scores = [0, 0]

  return {
    // return current round score; if 1, current score = 0
    currentVal: function(dieNum) {
      if (dieNum !== 1) {
        return current += dieNum;
      } else {
        current = 0;
        return current;
      }
    },

    // return Player 1 or Player 2 value
    getPlayer: function() {
      return activePlayer;
    },

    // update Player 1 or Player 2
    setPlayer: function(player) {
      activePlayer = player;
    },

    // change players
    nextPlayer: function() {
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    },

    // reset Current value to 0
    resetCurrent: function() {
      current = 0;
    },

    // update total score for current player
    updateScore: function(turn) {
      scores[turn] += current;
    },

    // return total score for current player
    getTotal: function(turn) {
      return scores[turn];
    }
  }
})();

// view
var view = (function() {
  return {
    // update dice image
    showDieNum: function(dieNum) {
      document.getElementById('dice-0').src = 'dice-' + dieNum + '.png';
    },

    // update value in Current div
    updateCur: function(cur, player) {
      document.getElementById('current-' + player).innerHTML = cur;
    },

    // remove .active class from player whose turn just ended, add .active class to next player
    activeClass: function() {
      var i;
      for (i = 0; i < 2; i++) {
        document.querySelector('.player-' + i + '-panel').classList.toggle('active');
      }
    },

    // update value in Total div
    updateTotal: function(curPlayer, total) {
      document.getElementById('score-' + curPlayer).innerHTML = total;
    },

    // update styling for new game, reset current & total scores to 0 in UI
    newGame: function() {
      var i;
      for (i = 0; i < 2; i++) {
        document.getElementById('score-' + i).innerHTML = 0;
        document.getElementById('current-' + i).innerHTML = 0;
        document.querySelector('.player-' + i + '-panel').classList.remove('active');
        document.querySelector('.player-' + i + '-panel').classList.remove('winner');
        document.getElementById('name-' + i).innerHTML = 'Player ' + (i + 1);
      }
      document.getElementById('dice-0').style.visibility = "visible";
      document.querySelector('.player-0-panel').classList.add('active');
      document.querySelector('.btn-roll').style.visibility = 'visible';
      document.querySelector('.btn-hold').style.visibility = 'visible';
    },

    // hide roll & hide buttons, remove .active class, add .winner class to victor, change player text
    endGame: function() {
      document.querySelector('.btn-roll').style.visibility = 'hidden';
      document.querySelector('.btn-hold').style.visibility = 'hidden';
      document.querySelector('.player-' + player + '-panel').classList.remove('active');
      document.querySelector('.player-' + player + '-panel').classList.add('winner');
      document.getElementById('name-' + player).innerHTML = 'Winner!';
    }
  }
})();

// controller
var controller = (function(m,v) {
  // initialize the app
  init();

  // reset game if 'new game' button pressed
  document.querySelector('.btn-new').addEventListener('click', init);

  // 'roll dice' button logic
  document.querySelector('.btn-roll').addEventListener('click', function() {
    
    var die, current, roundTotal, sum;
    die = Math.floor(Math.random() * 6) + 1;
    current = m.currentVal(die);
    player = m.getPlayer();
    roundTotal = m.getTotal(player);
    sum = roundTotal + current;    
    v.showDieNum(die);


    if (die > 1) {
      // if (current score is not 1 AND current score + total score less than 10) then update current score for active player
      if (sum < 10) {
        v.updateCur(current, player);

      // if (current score is not 1 AND current score + total score greater or equal to 10) current player wins
      } else {
        m.resetCurrent();
        v.updateCur(0, player);
        m.updateScore(player);
        v.updateTotal(player, sum);
        v.endGame(player);
      }

      // if player rolls a 1, lose a turn and next player's turn
    } else {
      v.updateCur(0, player);
      v.activeClass();
      m.nextPlayer();
    }
  });

  // add current score to player's total score, reset Current score to 0 for next player, next player
  document.querySelector('.btn-hold').addEventListener('click', function() {
    var player, totalScore;

    player = m.getPlayer()
    m.updateScore(player);
    totalScore = m.getTotal(player);
    m.resetCurrent();
    v.activeClass();
    v.updateTotal(player, totalScore);
    v.updateCur(0, player);
    m.nextPlayer();
  });

  // player 1's turn, reset score to 0 in model, update page styling & set scores to 0 in UI
  function init() {
    m.setPlayer(0);
    m.resetCurrent();
    v.newGame();
  }
})(model, view);