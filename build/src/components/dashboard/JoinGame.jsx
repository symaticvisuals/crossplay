import  { useContext, useEffect, useState } from "react";
import pattern from "../../img/zigzag_small.png";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGame } from "../../api/operations/teztris";
import { manageFunc } from "../../App";

import {

  useWeb3ModalProvider
} from '@web3modal/ethers/react'
import { CONFIG } from "../../common/const";


function JoinGame({ swapFunc }) {
  const socket = useSelector((state) => state.socket.socket);
  const [uuid, setUuid] = useState("");
  const [response, setResponse] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [startGameID, setStartGameID] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { gameIdInput, setGameIdInput, createdGame } = useContext(manageFunc);
  const { walletProvider } =  useWeb3ModalProvider();

  const handleGameIdInput = (event) => {
    const gameUuid = event.target.value;
    setUuid(gameUuid);
    socket.emit("wantsToJoin", { uuid: gameUuid });
  };

  useEffect(() => {
    if (socket) {
      socket.on("match-found", (data) => {
        setMatchData(data);
        setResponse(null);
      });

      socket.on("status", (data) => {
        setMatchData(null);
        setResponse(`Error: ${data}`);
      });

      socket.on("start-game", (data) => {
        setStartGameID(data._id);
      });

      // Clean up the event listeners when the component unmounts
      return () => {
        socket.off("match-found");
        socket.off("status");
        socket.off("start-game");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (startGameID && gameIdInput && startGameID === gameIdInput) {
      navigate("/app", { replace: true });
    }
  }, [startGameID, gameIdInput, navigate]);

  const handlecreateGame = async () => {
    setLoading(true);
    if (!matchData) {
      alert("no match data found");
      return;
    }
    if (createdGame) {
      alert("cant join a game, end your created game first!");
      return;
    }

    // const createGameApi = await createGame(matchData.tokenData.amount,matchData.tokenData.betToken,matchData.tokenData.betTokenId,matchData.tokenData.betTokenType,6,uuid);
    const createGameApi = await createGame(matchData.tokenData.amount,uuid,walletProvider,CONFIG.ARBITRUM.ADDRESS);
    if (createGameApi.success === true) {
      socket.emit("playerJoins", { gameId: uuid });
      setGameIdInput(uuid);
    }
    setLoading(false);
  };

  // console.log(gameIdInput,"gameId")

  useEffect(() => {
    if (socket) {
      socket.on("start-game", (data) => {
        setStartGameID(data._id);
      });
    }
  }, []);

  useEffect(() => {
    if (startGameID && gameIdInput && startGameID == gameIdInput) {
      navigate("/app", { replace: true });
    }
  }, [startGameID, gameIdInput, navigate]);

  return (
    <div className="createGame">
      <div className="card">
        <div className="center">
          <h1>Join Game</h1>
          <input
            type="text"
            onChange={handleGameIdInput}
            placeholder="paste game ID here ..."
          ></input>

          {response ? (
            response
          ) : matchData ? (
            <div className="match-data">
              <p>Room Name : {matchData.alias}</p>
              <span>
                Amount : {matchData.tokenData.amount}{" "}
                {matchData.tokenData.betTokenName}
              </span>
            </div>
          ) : (
            <img src={pattern}></img>
          )}
          <a href="#" className="orange-btn" onClick={handlecreateGame}>
            Join Game
          </a>
        </div>
      </div>
      <div className="blue-btn" onClick={() => swapFunc(false)}>
        {loading ? "Joining.." : "Create Game"}
      </div>
    </div>
  );
}

export default JoinGame;
