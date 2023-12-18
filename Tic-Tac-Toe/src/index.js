import _ from 'lodash';
import TicTacToe from './modules/TicTacToe';
import styles from './index.css';

const html = `<form class="intro">
<h1 class="title">tic tac toe</h1>
<div class="row">
  <input name="player1" type="text" placeholder="Player 1" class="inpt" required />
  <input name="player2" type="text" placeholder="Player 2" class="inpt" required />
</div>
<button class="btn">Start</button>
</form>
<div class="game">
<div class="board"></div>
</div>
<div class="toast">
<span>Mohammad</span>
</div>`;

document.body.insertAdjacentHTML('beforeend', html);

const toast = document.querySelector('.toast');
const container = document.querySelector('.board');
const introForm = document.querySelector('.intro');

// initialize
container.classList.add('hide');
const game = new TicTacToe(container);
game.onFinished(() => {
  toast.classList.add('show');
});

// listeners
introForm.addEventListener('submit', (e) => {
  e.preventDefault();
  game.createGame();
  introForm.style.display = 'none';
  container.classList.remove('hide');
});
toast.addEventListener('click', () => {
  if (toast.classList.contains('show')) {
    toast.classList.remove('show');
  }
});
toast.addEventListener('transitionend', () => {
  if (toast.classList.contains('show')) {
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
});
