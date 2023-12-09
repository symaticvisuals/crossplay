import { createContext } from "react";

const manageFunc = createContext({
    gameOver: false,
    setGameOver: () => {},
    gameIdInput: "",
    setGameIdInput: () => {},
    userWallet: null,
    setUserWallet: () => {},
    createdGame: false,
    setCreatedGame: () => {},
});

export { manageFunc };