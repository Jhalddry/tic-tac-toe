import confetti from "canvas-confetti";
import { TURNS, WINNER_COMBOS } from "../../constants";

export const checkWinnerFrom = (boardToCheck) => {
    //*Check all winning combos
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        //*We have a winner
        return boardToCheck[a]
      }
    }
    //*If no winner return null
    return null;
  }

export const checkEndGameFrom = (newBoard) => {
    return newBoard.every((square) => square !== null)
}  

export const newTurn = (turn) => {
    return turn === TURNS.X ? TURNS.O : TURNS.X
}