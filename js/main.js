/*----- constants -----*/
const lookup = {'null': '0',
'1': 'pink',
'-1': 'grey',
};
    
    //I really want to figure out how to add-
  // a unique symbol to populate when a box is selected...
  
  const gorToken = src ="../tick-tack-toe/images/blue-gorilla.png";
  const rhiToken = src ="../tick-tack-toe/images/red-rhino.png";
  
const winningComb = [
  [0, 1, 2],[3, 4, 5],
  [6, 7, 8],[0, 3, 6],
  [1, 4, 7],[2, 5, 8],
  [0, 4, 8],[2, 4, 6]
];
/*----- app's state (variables) -----*/

let gametable, turn, winner;

/*----- cached element references -----*/
const boxes = document.querySelectorAll('td div');
const display = document.querySelector('h1');


/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);
//  document.querySelector('table').addEventListener('click', tokenSet);
document.querySelector('button').addEventListener('click', initialize);

/*----- functions -----*/

initialize();

//  function tokenSet() {
// //  console.log('heck yeah')
// gametable.forEach(function(box, idx) {
//   boxes[idx].style.src = gorToken;
// });
// // if (winner === 'T') {
// //   display.innerHTML = 'CATS GAME';
// // } else if (winner) {
// //   display.innerHTML = `Well done ${lookup[winner].toLowerCase()}!`;
// // } else {
// //   display.innerHTML = `It's ${lookup[turn].toLowerCase()}'s turn`;
// // }
//  }

function handleMove(evt) {
  const idx = parseInt(evt.target.id.replace('box', ''));
  if (gametable[idx] || winner) return;
  gametable[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function getWinner() {
  for (let i = 0; i < winningComb.length; i++) {
    if (Math.abs(gametable[winningComb[i][0]]
         + gametable[winningComb[i][1]]
          + gametable[winningComb[i][2]]) === 3)
           return gametable[winningComb[i][0]];
  }
  if (gametable.includes(null)) return null;
  return 'T';
}

function render() {
  gametable.forEach(function(box, idx) {
    boxes[idx].style.background = lookup[box];
  });
  if (winner === 'T') {
    display.innerHTML = 'CATS GAME';
  } else if (winner) {
    display.innerHTML = `Well done ${lookup[winner].toLowerCase()}!`;
  } else {
    display.innerHTML = `It's ${lookup[turn].toLowerCase()}'s turn`;
  }
}

function initialize() {
  gametable = [null,null,null,null,null,null,null,null,null];
  turn = 1;
  winner = null;
  render();
}