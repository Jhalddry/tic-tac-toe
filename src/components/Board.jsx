import { Square } from "./Square"

export const Board = ({ board, updateBoard }) => {
  return (
        board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          )
        })
  )
}
