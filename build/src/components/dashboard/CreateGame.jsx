import React, { useContext, useEffect, useState } from "react";
import InputField from "./InputField";
import pattern from "../../img/zigzag_small.png";
import {
  useWeb3ModalState,
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { createGame, removeGame } from "../../api/operations/teztris";
import { manageFunc } from "../../App";
import { CONFIG, getChainNameByChainId } from "../../common/const";

function CreateGame({ swapFunc }) {
  const socket = useSelector((state) => state.socket.socket);
  const { gameIdInput, setGameIdInput, setCreatedGame } =
    useContext(manageFunc);
  const [tokenIndex, setTokenIndex] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [alias, setAlisa] = useState("");
  const [createGameEmit, setCreateGameEmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [matchFoundData, setMatchFoundData] = useState("");
  const [startGameID, setStartGameID] = useState(null);

  const navigate = useNavigate();

  const { walletProvider } = useWeb3ModalProvider();

  // useEffect(()=>{
  //   if(createGameEmit){
  //     alert("createGameEmit Done")
  //   }
  // },[createGameEmit])

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const { address, chainId, isConnected } = useWeb3ModalAccount();

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
      uuid: tuid,
      isPublic: true,
      alias: alias,
      chain: getChainNameByChainId(chainId), //config se
      obj: {
        amount: tokenAmount,
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
    console.log(createGameJson, "create game json");
    console.log(
      CONFIG[getChainNameByChainId(chainId)].ADDRESS,
      "create game json"
    );
    const createGameApi = await createGame(
      tokenAmount,
      tuid,
      walletProvider,
      CONFIG[getChainNameByChainId(chainId)].ADDRESS
    );
    if (createGameApi.success === true) {
      socket.emit("createNewGame", createGameJson);
      enqueueSnackbar('Game created successfully.', {anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }, variant: 'success' })

      setCreateGameEmit(true);
      setCreatedGame(true);
    } else {
      alert("CreateGame Failed");
    }
    setLoading(false);
  };

  const handleRefund = async () => {
    const removeGameApi = await removeGame(
      gameIdInput,
      walletProvider,
      CONFIG[getChainNameByChainId(chainId)].ADDRESS
    );
    console.log(gameIdInput, "remove game api");
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
        // console.log(data,"create game")
        setGameIdInput(null);
        setCreateGameEmit(false);
        setCreatedGame(false);
      });
    }
  }, []);
  // navigate("/app", { replace: true });

  // listen for "matchFound" or error messages
  useEffect(() => {
    if (socket) {
      socket.on("old-game-found", (data) => {
        // console.log(data,"create game")
        setGameIdInput(data._id);
        setCreateGameEmit(true);
        setCreatedGame(true);
      });
    }
  }, []);

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
  }, [startGameID, gameIdInput]);
  const handleAlisa = (event) => {
    setAlisa(event.target.value);
  };

  // console.log(matchFoundData,response,"matchdata, response")
  return (
    <>
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
            <h1>Create Game</h1>
            <input
              type="number"
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
              placeholder="Bet token amount"
              value={tokenAmount}
              onChange={() => {
                setTokenAmount(event.target.value);
              }}
            />
            {/* <InputField
              placeholder="Bet token amount"
              setTokenIndex={setTokenIndex}
              setTokenAmount={setTokenAmount}
              tokenAmount={tokenAmount}
            /> */}
            <input
              className=""
              style={{
                // styles for input
                padding: "20px 20px",
                fontSize: "16px",
                border: "none",
                // width: "100%",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                marginTop: "20px",
                marginBottom: "20px",
              }}
              type="text"
              onChange={handleAlisa}
              placeholder="Room name"
            ></input>
            <div className="" style={{
              display:"flex",
              // justifyContent:"center",
              gap:"20px",
              alignItems:"center",
            }}>

           
            {createGameEmit && (
              <div className="game-details">
                <p>Game created, waiting for opponent to join</p>
                <span>{gameIdInput}</span>
                <div className="cancel-game" onClick={handleRefund}>
                  cancel game
                </div>
              </div>
            )}

            <button
             
              onClick={() => createGameHandle()}
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
            >
              {loading
                ? "Loading..."
                : createGameEmit
                ? "Waiting..."
                : "Create Game"}
            </button>
            <button
          style={{
            padding: "20px",
            flexGrow: "1",
            fontSize: "16px",
            border: "none",
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
          onClick={() => swapFunc(true)}
        >
          Join Game
        </button>
            </div>
          </div>
        </div>
       
      </div>
    </>
  );
}
export default CreateGame;
