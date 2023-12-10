import React, { useState } from "react";
import Tetris from "./components/Tetris";
import Landing from "./components/landing/Landing";
import StartGame from "./components/StartGame";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/dashboard/Home";
import Profile from "./components/profile/Profile";
import { Provider } from "react-redux";
import store from "./api/store";
import { SnackbarProvider } from "notistack";
import TetrisDemo from "./components/TetrisDemo";
// import { manageFunc } from './providers/state-provider';
import NetworkSelector from "./components/selector/NetworkSelector";
import TetrisNew from "./components/TetrisNew";
import { HuddleProvider, HuddleClient } from '@huddle01/react';
 

const manageFunc = React.createContext(null);

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [point, setPoint] = useState(0);
  const [gameIdInput, setGameIdInput] = useState("");
  const [userWallet, setUserWallet] = useState(null);
  const [createdGame, setCreatedGame] = useState(false);
  const [huddleId, setHuddleId] = useState(null);
  const [tokenId, setTokenId] = useState(null);

  const huddleClient = new HuddleClient({
    projectId: "EVShSskc5aE_Us8Sscj9O_PPgxh9y6M7",
    options: {
      activeSpeakers: {
        size: 8,
      },
    },
  });
  
  
  return (
    <div
      className=""
      style={{
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      <HuddleProvider client={huddleClient}>
      <Provider store={store}>
        <SnackbarProvider />
        <BrowserRouter>
          <manageFunc.Provider
            value={{
              gameOver,
              setGameOver,
              huddleId,
              setHuddleId,
              tokenId,
              setTokenId,
              gameIdInput,
              setGameIdInput,
              userWallet,
              setUserWallet,
              createdGame,
              setCreatedGame,
              point,
              setPoint,
            }}
          >
            <Routes>
              <Route path="/app" element={<TetrisNew />} />
              <Route path="/demo" element={<TetrisDemo />} />
              <Route path="/demonew" element={<TetrisNew />} />
              <Route path="/start" element={<StartGame />} />
              <Route path="/home" element={<Home />} />
              <Route path="/select" element={<NetworkSelector />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Landing />} />
            </Routes>
          </manageFunc.Provider>
        </BrowserRouter>
      </Provider>
      </HuddleProvider>
      
    </div>
  );
}

export { App as default, manageFunc };
