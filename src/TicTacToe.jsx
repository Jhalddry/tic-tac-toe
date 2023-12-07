import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkEndGameFrom, checkWinnerFrom, newTurn } from "./components/logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { Board } from "./components/Board"
import { resetGameToStorage, saveGameToStorage } from "./components/logic/storage"

function TicTacToe() {
  
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null) //*Null = no winner, false = tie, 'X' or 'O' = winner

  function resetGame() {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    //*Reset localStorage
    resetGameToStorage()
  }

  function checkWinnerAndEndGame(newBoard) {
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGameFrom(newBoard)) {
      setWinner(false);
    }
  }

  function updateBoard(index) {
    //*Check is the player can make a move
    if (board[index] || winner) return;

    //*Update board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    //*Change turn
    setTurn(newTurn(turn))

    //*Save game
    saveGameToStorage(newBoard, newTurn(turn))

    //*Check for winner
    checkWinnerAndEndGame(newBoard)
  }

  return (
    <main className="board">

      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      
        <section className="game">
          <Board board={board} updateBoard={updateBoard}/>
        </section>

        <section className="turn">
          <Square isSelected={ turn === TURNS.X }>
            {TURNS.X}
            </Square>
          <Square isSelected={ turn === TURNS.O }>
            {TURNS.O}
            </Square>
        </section>

        <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
  )
}

export default TicTacToe;