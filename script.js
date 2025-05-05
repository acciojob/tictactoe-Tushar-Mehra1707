//your JS code here. If required.
let currentPlayer = 'X';
let board = Array(9).fill('');
let players = {
  X: '',
  O: ''
};
let gameActive = true;

document.getElementById('submit').addEventListener('click', () => {
  const player1 = document.getElementById('player-1').value.trim();
  const player2 = document.getElementById('player-2').value.trim();

  if (player1 === '' || player2 === '') {
    alert('Please enter names for both players!');
    return;
  }

  players.X = player1;
  players.O = player2;

  document.getElementById('player-form').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  document.getElementById('message').textContent = `${players[currentPlayer]}, you're up!`;
});

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    const id = parseInt(cell.id) - 1;

    if (!gameActive || board[id] !== '') return;

    board[id] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      document.getElementById('message').textContent = `${players[currentPlayer]}, congratulations you won!`;
      gameActive = false;
      return;
    }

    if (!board.includes('')) {
      document.getElementById('message').textContent = `It's a draw!`;
      gameActive = false;
      return;
    }

    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('message').textContent = `${players[currentPlayer]}, you're up!`;
  });
});

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}
