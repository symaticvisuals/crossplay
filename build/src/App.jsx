import  React,{ useState } from 'react';
import Tetris from './components/Tetris';
import Landing from './components/landing/Landing';
import StartGame from './components/StartGame';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/dashboard/Home';
import Profile from './components/profile/Profile';
import { Provider } from 'react-redux';
import store from './api/store';
import { SnackbarProvider } from 'notistack';
import TetrisDemo from './components/TetrisDemo';
// import { manageFunc } from './providers/state-provider';
import NetworkSelector from './components/selector/NetworkSelector';
import TetrisNew from './components/TetrisNew';

const manageFunc = React.createContext(null);


function App() {

  const [gameOver, setGameOver] = useState(false);
  const [gameIdInput, setGameIdInput] = useState('');
  const [userWallet, setUserWallet] = useState(null);
  const [createdGame, setCreatedGame] = useState(false);

  return (
   
    <Provider store={store}>
   
      <SnackbarProvider />
      <BrowserRouter>
        <manageFunc.Provider value={{ gameOver, setGameOver, gameIdInput, setGameIdInput ,userWallet, setUserWallet , createdGame, setCreatedGame}}>
          <Routes>
            <Route path="/app" element={<Tetris />} />
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
  );
}

export {
  App as default,
  manageFunc,
};