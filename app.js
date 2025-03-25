const gameBoard = document.querySelector('.game_board');
const messageTurn = document.querySelector('.game_turn');
const endGame = document.querySelector('.endgame');
const endGameResult = document.querySelector('.endgame_result');
const buttonReset = document.querySelector('.endgame_button');

let isTurnX = true;
let turn = 0;
const maxTurn = 9;
const players = {
    x: 'cross',
    o: 'circle'
};

const winningPosition = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6] // <-- Se eliminó el array vacío `[]`
];

messageTurn.textContent = isTurnX ? 'X' : 'O';
createBoard();

function createBoard() {
    gameBoard.innerHTML = ''; // Limpia el tablero

    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div');
        div.classList.add('cell');

        div.addEventListener('click', handleGame, { once: true });

        gameBoard.append(div);
    }
}

function handleGame(e) {  
    const currentCell = e.currentTarget;
    const currentTurn = isTurnX ? players.x : players.o;

    turn++;
    drawShape(currentCell, currentTurn);

    if (checkWinner(currentTurn)) {
        return; // Detenemos la ejecución aquí si hay un ganador
    }

    if (turn === maxTurn) {
        showEndGame(false); // Si se alcanzan 9 turnos y no hay ganador, es empate
        return;
    }

    changeTurn();
}

function drawShape(element, newClass) {
    element.classList.add(newClass);
}

function changeTurn() {
    isTurnX = !isTurnX;
    messageTurn.textContent = isTurnX ? 'X' : 'O';
}

function checkWinner(currentPlayer) {
    const cells = document.querySelectorAll('.cell');

    const winner = winningPosition.some(array => {
        return array.every(position => {
            return cells[position].classList.contains(currentPlayer);
        });
    });

    if (winner) {
        showEndGame(true);
        return true; 
    }

    return false;
}

function showEndGame(hasWinner) {
    endGame.classList.add('show');
    
    if (hasWinner) {
        const winnerText = isTurnX ? 'X' : 'O';
        endGameResult.textContent = `¡El jugador ${winnerText} ha ganado!`;
    } else {
        endGameResult.textContent = '¡Es un empate!';
    }
}

// Reiniciar el juego al presionar el botón
buttonReset.addEventListener('click', () => {
    endGame.classList.remove('show');
    isTurnX = true;
    turn = 0;
    messageTurn.textContent = 'X';
    createBoard();
});
