class TicTacToe {
  constructor(container) {
    this.container = container;
    this.points = Array.from({length: 9}, () => '');
    this.player1 = {
      name: '',
      score: 0,
    };
    this.player2 = {
      name: '',
      score: 0,
    };
    this.isFinished = false;
    this.isDraw = false;
    this.winner = '';
    this.activePlayer = '😾';
    this.moveCount = 0;
    this.winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  createGame() {
    for (let i = 1; i <= 9; i++) {
      const cell = document.createElement('div');
      cell.setAttribute('data-index', i);
      cell.className += 'cell';
      cell.addEventListener('click', this.hancleCellClicked.bind(this));
      this.container.insertAdjacentElement('beforeend', cell);
    }
  }

  hancleCellClicked(e) {
    const cell = e.target;
    if (cell.textContent || this.isFinished) return;
    cell.textContent = this.activePlayer;
    const index = Number(cell.dataset.index);
    this.points[index - 1] = this.activePlayer;
    this.changePlayer();
    this.moveCount++;
    if (this.moveCount < 5) return;
    this.checkForWinner();
  }

  changePlayer() {
    this.activePlayer = this.activePlayer === '😾' ? '🥱' : '😾';
  }

  checkForWinner() {
    console.log(this.points);
    for (let i = 0; i <= 7; i++) {
      const winCondition = this.winningConditions[i];
      console.log(winCondition);
      const a = this.points[winCondition[0]];
      const b = this.points[winCondition[1]];
      const c = this.points[winCondition[2]];
      if (a === '' || b === '' || c === '') continue;
      if (a === b && b === c) {
        this.isFinished = true;
        this.winner = a;
        console.log('hi');
        this.showWinnerToast();
      }
    }
  }

  showWinnerToast() {
    if (this.showToast) {
      this.showToast();
    }
  }

  onFinished(fn) {
    this.showToast = fn;
  }
}

export default TicTacToe;
