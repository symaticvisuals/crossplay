// import React from 'react';
import Tetris from "react-tetris";
import "./TetrisNew.css";

import React, { useContext, useEffect, useState } from "react";

import { manageFunc } from "../App";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import ResultModal from "./Modal";
import useSound from "use-sound";
import music from "../img/music.mp3";
import brandLogo from "../img/brand-logo.png";

const Emitter = ({ points, state }) => {
  const { setGameOver, setPoint } = useContext(manageFunc);
  useEffect(() => {
    if (state == "LOST") {
      setGameOver(true);
    }
  }, [state]);
  useEffect(() => {
    setPoint(points);
  }, [points]);
  return <></>;
};

const TetrisNew = () => {
  const socket = useSelector((state) => state.socket.socket); // get the socket object from the store
  const [opponentScore, setOpponentScore] = useState(Number.MAX_SAFE_INTEGER);
  const { gameOver, setGameOver, gameIdInput, point } = useContext(manageFunc);
  const navigate = useNavigate();
  const [gameResult, setGameResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opponentEnded, setOpponentEnded] = useState(false);
  const [winNotif, setwinNotif] = useState(false);
  // const [ score , setScore] = useState(0);

  // music module
  const [play, ExposedData] = useSound(music, { volume: 0.25 });

  const [count, setCount] = useState(1);
  const handlePausePlay = () => {
    if (count % 2 === 0) {
      ExposedData.pause();
      setCount(count + 1);
    } else {
      play();
      setCount(count + 1);
    }
  };

  
  useEffect(() => {
      socket.once("opponent-ended", (s) => {
        // // console.log("opponent-ended score", s);
        setOpponentScore(parseInt(s));
        setOpponentEnded(true);
        enqueueSnackbar(`Opponent Ended game.`, {anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }, variant: 'info' })
      });
    }, []);

  useEffect(() => {
      if (gameOver) {
      const endGameParams = {
          "gameId": gameIdInput,
          "score": point
      }
      socket.emit("endGame", endGameParams );
      console.log("gameover emit done", endGameParams , typeof(endGameParams.score));
      setIsModalOpen(true);
      }
  }, [gameOver]);

  // winner handle

  useEffect(() => {
      socket.once("game-over", (obj) => {
        setGameOver(true);
        // console.log("game-over object", obj);
      });
      socket.on("issue", (status) => {
        alert(status);
      });
    });
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
  useEffect(() => {
    if (point >= opponentScore && !winNotif && !gameOver) {
      //   setWinnerDeclare(true)
      console.log("you're winner, first UE");
      enqueueSnackbar(`Congrats, you surpassed your opponent's score.`, {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        variant: "success",
      });
      enqueueSnackbar(`You can end the game and claim your winnings.`, {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        variant: "info",
      });
      enqueueSnackbar(`You can continue the game to make a highscore.`, {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        variant: "info",
      });
      setGameResult("win");
      setwinNotif(true);
    }
  });
  useEffect(() => {
    if (point >= opponentScore && !winNotif) {
      //   setWinnerDeclare(true)
      console.log("you're winner, first UE");
      setGameResult("win");
    }
  });
  useEffect(() => {
    if (gameOver) {
      if (winNotif) {
        setGameResult("win");
        return;
      }
      if (opponentEnded) {
        if (point <= opponentScore) {
          setGameResult("lose");
        }
      } else {
        setGameResult("pending");
      }
    }
  }, [gameOver, opponentEnded]);

  useEffect(()=>{
    if(gameResult==="lose"){
      handleModalClose();
      setIsModalOpen(true);
    }
    if((gameResult==="win") && gameOver){
      handleModalClose();
      setIsModalOpen(true);
    }
  },[gameResult,gameOver])

  window.onload = function () {
    navigate("/home", { replace: true });
  };

  useEffect(()=>{
    socket.emit('scoreEmitted',{"score":point})
  },[point])

  console.log(point, gameOver, "from func");

  return (
    <div className="root-game">
      <ResultModal
        isOpen={isModalOpen}
        result={gameResult}
        //  onClose={handleModalClose}
      />
      <Tetris
        keyboardControls={{
          // Default values shown here. These will be used if no
          // `keyboardControls` prop is provided.
          down: "MOVE_DOWN",
          left: "MOVE_LEFT",
          right: "MOVE_RIGHT",
          space: "HARD_DROP",
          z: "FLIP_COUNTERCLOCKWISE",
          x: "FLIP_CLOCKWISE",
          up: "FLIP_CLOCKWISE",
          p: "TOGGLE_PAUSE",
          c: "HOLD",
          shift: "HOLD",
        }}
      >
        {({
          HeldPiece,
          Gameboard,
          PieceQueue,
          points,
          linesCleared,
          state,
          // controller
        }) => (
          <div className="" style={{ marginTop: "30px", width: "100%" }}>
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={brandLogo}
                alt=""
                style={{
                  width: "12rem",
                }}
              />
            </div>
              <ScoresCard linesCleared={linesCleared} points={points}/>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className=""
                style={{
                  marginTop: "50px",
                  marginLeft: "-25px",
                }}
              >
                <Gameboard />
                <Emitter points={points} state={state} />
              </div>
              {/* {state==='LOST' && (
                    setGameOver(true)
                )}
                {points>0 &&(
                    setScore(points)
                )} */}
              {/* <PieceQueue /> */}
              {/* {state === 'LOST' && (
                    <div>
                    <h2>Game Over</h2>
                    <button onClick={controller.restart}>New game</button>
                    </div>
                )} */}
            </div>
          </div>
        )}
      </Tetris>
    </div>
  );
};

export default TetrisNew;

const ScoresCard = ({ linesCleared, points }) => {
  return (
    <div className="" style={{
      marginTop: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center", 
    }}>
      {/* <HeldPiece /> */}
     
      <div style={{  }}>
        <div className="score" style={{
          display:"flex",
          gap:"10px",
        }}>
          <p style={{
            padding: "10px 20px",
            backgroundColor: "#fff",
          }}>Score</p>
          <p style={{
            padding: "10px 20px",
            backgroundColor: "#d14fff",
          }}>Points: {points}</p>
          <p style={{
            padding: "10px 20px",
            backgroundColor: "#ff4e9d",
          }}>Lines Cleared: {linesCleared}</p>
        </div>
       
      </div>
    </div>
  );
};
