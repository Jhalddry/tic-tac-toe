export const saveGameToStorage = (boardToSave, turnToSave) => {
    window.localStorage.setItem('board', JSON.stringify(boardToSave))
    window.localStorage.setItem('turn', turnToSave)
}

export const resetGameToStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}