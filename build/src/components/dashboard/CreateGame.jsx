import React, { useContext, useEffect, useState } from "react";
import InputField from "./InputField";
import pattern from "../../img/zigzag_small.png";
import {
  useWeb3ModalState,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { createGame, removeGame } from "../../api/operations/teztris";
import { manageFunc } from "../../App";
import { CONFIG } from "../../common/const";


function CreateGame({ swapFunc }) {
  const socket = useSelector((state) => state.socket.socket);
  const { gameIdInput, setGameIdInput, setCreatedGame } =
    useContext(manageFunc);
  const [tokenIndex, setTokenIndex] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [alias, setAlias] = useState("");
  const [createGameEmit, setCreateGameEmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startGameID, setStartGameID] = useState(null);
  const navigate = useNavigate();

  const { walletProvider } = useWeb3ModalProvider();

  // useEffect(()=>{
  //   if(createGameEmit){
  //     alert("createGameEmit Done")
  //   }
  // },[createGameEmit])

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const createGameHandle = async () => {
    if (createGameEmit) {
      alert("Game already exisit");
      return;
    }
    if (tokenAmount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
    setLoading(true);
    let tuid = uuidv4();
    setGameIdInput(tuid);

    const createGameJson = {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      isPublic: true,
      alias: "test1",
      chain: "POLYGON",
      obj: {
        amount: 1,
        betToken: "ETH",
        betTokenType: "ETH",
        betTokenName: "ETH",
      },
    };
    // console.log(createGameJson)
    enqueueSnackbar(
      "Creating game, please verify from your wallet.",
      {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      },
      { variant: "info" }
    );
    const createGameApi = await createGame(
      tokenAmount,
      tuid,
      walletProvider,
      CONFIG.ARBITRUM.ADDRESS
    );
    if (createGameApi.success === true) {
      // socket.emit("createNewGame", createGameJson);
      enqueueSnackbar("Game created successfully.", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        variant: "success",
      });
      setCreateGameEmit(true);
      setCreatedGame(true);
    } else {
      alert("CreateGame Failed");
    }
    setLoading(false);
  };

  const handleRefund = async () => {
    const removeGameApi = await removeGame(gameIdInput);
    if (removeGameApi.success) {
      // console.log("Game Removed")
      socket.emit("refundGame");
    } else {
      alert("unable to refund game");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("game-refunded", (data) => {
        setGameIdInput(null);
        setCreateGameEmit(false);
        setCreatedGame(false);
      });

      socket.on("old-game-found", (data) => {
        setGameIdInput(data._id);
        setCreateGameEmit(true);
        setCreatedGame(true);
      });

      socket.on("start-game", (data) => {
        setStartGameID(data._id);
      });

      // Clean up the event listeners when the component unmounts
      return () => {
        socket.off("game-refunded");
        socket.off("old-game-found");
        socket.off("start-game");
      };
    }
  }, [socket, setGameIdInput, setCreatedGame]);

  useEffect(() => {
    if (startGameID && gameIdInput && startGameID === gameIdInput) {
      navigate("/app", { replace: true });
    }
  }, [startGameID, gameIdInput, navigate]);

  const handleAlias = (event) => {
    setAlias(event.target.value);
  };

  // console.log(matchFoundData,response,"matchdata, response")
  return (
    <div className="" style={{}}>
      <div className="">
        <div className="">
          <h1>Create Game</h1>
          <input type="text" placeholder="Bet token amount" />

         
          <input
            className=""
            type="text"
            onChange={handleAlias}
            placeholder="Room name"
          ></input>
          {createGameEmit && (
            <div className="">
              <p>Game created, waiting for opponent to join</p>
              <span>{gameIdInput}</span>
              <div className="cancel-game" onClick={handleRefund}>
                cancel game
              </div>
            </div>
          ) }

          <a href="#" onClick={() => createGameHandle()} className="">
            {loading
              ? "Loading..."
              : createGameEmit
              ? "Waiting..."
              : "Create Game"}
          </a>
        </div>
      </div>
      <div className="" onClick={() => swapFunc(true)}>
        Join Game
      </div>
    </div>
  );
}

export default CreateGame;
