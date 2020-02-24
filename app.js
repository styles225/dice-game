/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// my version

// model
var model = (function() {
  var current, activePlayer;
  current = 0;
  activePlayer = 0;

  return {
    currentVal: function(dieNum) {
      if (dieNum !== 1) {
        // return current += dieNum;
        console.log(current += dieNum);
        return current;
      } else {
        current = 0;
        console.log(current);
        return current;
      }
    },
    getPlayer: function() {
      return activePlayer;
    },
    setPlayer: function(player) {
      activePlayer = player;
    },
    nextPlayer: function() {
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    },
    setCurrent: function() {
      current = 0;
    }
  }

})();

// view
var view = (function() {
  return {
    showDieNum: function(dieNum) {
      document.getElementById('dice-0').src = 'dice-' + dieNum + '.png';
    },
    updateCur: function(cur, player) {
      document.getElementById('current-' + player).innerHTML = cur;
    },
    activeClass: function() {
      var i;
      for (i = 0; i < 2; i++) {
        document.querySelector('.player-' + i + '-panel').classList.toggle('active');
      }
    }
  }
})();
// controller
var controller = (function(m,v) {

  init();
  document.querySelector('.btn-new').addEventListener('click', init);

  document.querySelector('.btn-roll').addEventListener('click', function() {
    
    var die, current;
    die = Math.floor(Math.random() * 6) + 1;
    current = m.currentVal(die);
    player = m.getPlayer();
    
    v.showDieNum(die);


    if (die > 1) {
      v.updateCur(current, player);
    } else {
      v.updateCur(0, player);
      v.activeClass();
      m.nextPlayer();
    }
  });


  function init() {

    m.setPlayer(0);
    m.setCurrent();

    var i;
    for (i = 0; i < 2; i++) {
      document.getElementById('score-' + i).innerHTML = 0;
      document.getElementById('current-' + i).innerHTML = 0;
      //document.getElementById('dice-' + i).style.visibility = 'hidden';
      document.querySelector('.player-' + i + '-panel').classList.remove('active');
    }
    document.getElementById('dice-0').style.visibility = "visible";
    // document.getElementById('dice-0').style.visibility = 'hidden';
    document.querySelector('.player-0-panel').classList.add('active');
  }


})(model, view);




// new game & init = start new game:
// - player 1
// - player 1 styling
// - disappear dice
// - score = 0







// code along w/ jonas
// var scores, roundScore, activePlayer, gamePlaying;

// init();


// document.querySelector('.btn-roll').addEventListener('click', function() {
//     if(gamePlaying) {
//         // 1. Random number
//         var dice = Math.floor(Math.random() * 6) + 1;

//         //2. Display the result
//         var diceDOM = document.querySelector('.dice');
//         diceDOM.style.display = 'block';
//         diceDOM.src = 'dice-' + dice + '.png';


//         //3. Update the round score IF the rolled number was NOT a 1
//         if (dice !== 1) {
//             //Add score
//             roundScore += dice;
//             document.querySelector('#current-' + activePlayer).textContent = roundScore;
//         } else {
//             //Next player
//             nextPlayer();
//         }
//     }    
// });


// document.querySelector('.btn-hold').addEventListener('click', function() {
//     if (gamePlaying) {
//         // Add CURRENT score to GLOBAL score
//         scores[activePlayer] += roundScore;

//         // Update the UI
//         document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

//         // Check if player won the game
//         if (scores[activePlayer] >= 100) {
//             document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
//             document.querySelector('.dice').style.display = 'none';
//             document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
//             document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
//             gamePlaying = false;
//         } else {
//             //Next player
//             nextPlayer();
//         }
//     }
// });


// function nextPlayer() {
//     //Next player
//     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
//     roundScore = 0;

//     document.getElementById('current-0').textContent = '0';
//     document.getElementById('current-1').textContent = '0';

//     document.querySelector('.player-0-panel').classList.toggle('active');
//     document.querySelector('.player-1-panel').classList.toggle('active');

//     //document.querySelector('.player-0-panel').classList.remove('active');
//     //document.querySelector('.player-1-panel').classList.add('active');

//     document.querySelector('.dice').style.display = 'none';
// }

// document.querySelector('.btn-new').addEventListener('click', init);

// function init() {
//     scores = [0, 0];
//     activePlayer = 0;
//     roundScore = 0;
//     gamePlaying = true;
    
//     document.querySelector('.dice').style.display = 'none';

//     document.getElementById('score-0').textContent = '0';
//     document.getElementById('score-1').textContent = '0';
//     document.getElementById('current-0').textContent = '0';
//     document.getElementById('current-1').textContent = '0';
//     document.getElementById('name-0').textContent = 'Player 1';
//     document.getElementById('name-1').textContent = 'Player 2';
//     document.querySelector('.player-0-panel').classList.remove('winner');
//     document.querySelector('.player-1-panel').classList.remove('winner');
//     document.querySelector('.player-0-panel').classList.remove('active');
//     document.querySelector('.player-1-panel').classList.remove('active');
//     document.querySelector('.player-0-panel').classList.add('active');
// }








/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
