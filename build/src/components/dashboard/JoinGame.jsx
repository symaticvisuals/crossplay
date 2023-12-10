import { useContext, useEffect, useState } from "react";
import pattern from "../../img/zigzag_small.png";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGame } from "../../api/operations/teztris";
import { manageFunc } from "../../App";

import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { CONFIG, getChainNameByChainId } from "../../common/const";
import { URL } from "../../api/socket";
import axios from "axios";

function JoinGame({ swapFunc }) {
  const socket = useSelector((state) => state.socket.socket);
  const [uuid, setUuid] = useState("");
  const [response, setResponse] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [startGameID, setStartGameID] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    setHuddleId,
    gameIdInput,
    setGameIdInput,
    createdGame,
    setTokenId,
    huddleId,
  } = useContext(manageFunc);
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const handleGameIdInput = (event) => {
    const gameUuid = event.target.value;
    setUuid(gameUuid);
    socket.emit("wantsToJoin", { uuid: gameUuid });
  };

  useEffect(() => {
    if (socket) {
      socket.on("match-found", (data) => {
        setMatchData(data);
        console.log(data,"matchData");
        setHuddleId(data?.huddleRoomId);
        setResponse(null);
      });

      socket.on("status", (data) => {
        setMatchData(null);
        setResponse(`Error: ${data}`);
      });

      socket.on("start-game", (data) => {
        setStartGameID(data._id);
console.log(data,"start-game-data")
        setHuddleId(data.huddleRoomId);
      });

      // Clean up the event listeners when the component unmounts
      return () => {
        socket.off("match-found");
        socket.off("status");
        socket.off("start-game");
      };
    }
  }, [socket]);

  const handleHuddleAt = async () => {
    try {
      const res = await axios.post(`${URL}/api/huddleAT`,null, { params: {
        huddleRoomId: huddleId,
      }});
      console.log(res.data, "huddle response");
      setTokenId(res.data.token)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (startGameID && gameIdInput && startGameID === gameIdInput) {
      //api-call-huddle-jwt

      handleHuddleAt().then(() => {
        console.log("huddleAT done");
      });

      // navigate("/app", { replace: true });
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
    console.log(
      matchData.tokenData.amount,
      uuid,
      walletProvider,
      CONFIG[getChainNameByChainId(chainId)].ADDRESS,
      "before create game"
    );
    // const createGameApi = await createGame(matchData.tokenData.amount,matchData.tokenData.betToken,matchData.tokenData.betTokenId,matchData.tokenData.betTokenType,6,uuid);
    const createGameApi = await createGame(
      matchData.tokenData.amount,
      uuid,
      walletProvider,
      CONFIG[getChainNameByChainId(chainId)].ADDRESS
    );
    if (createGameApi.success === true) {
      socket.emit("playerJoins", {
        gameId: uuid,
        opponentChain: getChainNameByChainId(chainId),
      });
      setGameIdInput(uuid);
    }
    setLoading(false);
  };

  // console.log(gameIdInput,"gameId")

  useEffect(() => {
    if (socket) {
      socket.on("start-game", (data) => {
        setStartGameID(data._id);
      console.log(data,"start-game-data");
        setHuddleId(data.huddleRoomId);
      navigate("/app", { replace: true });

      });
    }
  }, []);

  useEffect(() => {
    if (startGameID && gameIdInput && startGameID == gameIdInput) {
      // navigate("/app", { replace: true });
    }
  }, [startGameID, gameIdInput, navigate]);

  return (
    <div
      className=""
      style={{
        background: "rgba(15, 15, 15, 0.842)",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        // gap: "20px",
        justifyContent: "center",
      }}
    >
      <div className="">
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>Join Game</h1>
          <input
            style={{
              // styles for input
              padding: "20px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              marginTop: "20px",
            }}
            type="text"
            onChange={handleGameIdInput}
            placeholder="paste game ID here ..."
          ></input>

          {response
            ? response
            : matchData && (
                <div className="">
                  <p>Room Name : {matchData.alias}</p>
                  <span>
                    Amount : {matchData.tokenData.amount}{" "}
                    {matchData.tokenData.betTokenName}
                  </span>
                </div>
              )}
        </div>
      </div>
      <div
        className=""
        style={{
          display: "flex",
          marginTop: "20px",
          gap: "20px",
        }}
      >
        <button
          href="#"
          className=""
          style={{
            // styles for input
            padding: "20px 20px",
            fontSize: "16px",
            flexGrow: "1",
            borderRadius: "10px",

            background: "#d14fff",
            color: "white",
            marginTop: "20px",
            marginBottom: "20px",
            textAlign: "center",
            display: "block",
            cursor: "pointer",
            textDecoration: "none",
          }}
          onClick={handlecreateGame}
        >
          Join Game
        </button>
        <button
          className=""
          style={{
            // styles for input
            padding: "20px 20px",
            fontSize: "16px",
            flexGrow: "1",
            borderRadius: "10px",

            background: "#d14fff",
            color: "white",
            marginTop: "20px",
            marginBottom: "20px",
            textAlign: "center",
            display: "block",
            cursor: "pointer",
            textDecoration: "none",
          }}
          onClick={() => swapFunc(false)}
        >
          {loading ? "Joining.." : "Create Game"}
        </button>
      </div>
    </div>
  );
}

export default JoinGame;
