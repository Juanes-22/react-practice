import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";

import { PLAYERS } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";

import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveGameStorage, resetGameStorage } from "./logic/storage/index.js";

function App() {
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem("board");
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
    });

    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem("turn");
        return turnFromStorage ?? PLAYERS.X;
    });

    const [winner, setWinner] = useState(null);

    const updateBoard = (index) => {
        // no actualizamos si ya tiene algo o ya hay un ganador
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);

        const newTurn = turn === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
        setTurn(newTurn);

        // guardar partida
        saveGameStorage({
            board: newBoard,
            turn: newTurn,
        });

        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            confetti();
            setWinner(newWinner);
        } else if (checkEndGame(newBoard)) {
            setWinner("draw");
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(PLAYERS.X);
        setWinner(null);

        resetGameStorage();
    };

    return (
        <main className="board">
            <h1>Tic Tac Toe</h1>
            <button onClick={resetGame}>Reset del juego</button>
            <section className="game">
                {board.map((square, index) => {
                    return (
                        <Square key={index} index={index} updateBoard={updateBoard}>
                            {square}
                        </Square>
                    );
                })}
            </section>

            <section className="turn">
                <Square isSelected={turn === PLAYERS.X}>{PLAYERS.X}</Square>
                <Square isSelected={turn === PLAYERS.O}>{PLAYERS.O}</Square>
            </section>

            <WinnerModal resetGame={resetGame} winner={winner} />
        </main>
    );
}

export default App;
