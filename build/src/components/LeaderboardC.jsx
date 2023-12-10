import axios from "axios";
import React, { useEffect, useState } from "react";

import Avatar1 from "../img/avatar.jpg";
import Avatar2 from "../img/avatar.webp";
import Avatar3 from "../img/avatar3.jpeg";
import { URL } from "../api/socket";

const players = [
  {
    position: 1,
    address: "0x1234567890",
    xp: 100,
    score: {
      won: 1,
      loss: 0,
    },
    profile: Avatar1,
  },
  {
    position: 2,
    address: "0x1234567890",
    xp: 100,
    score: {
      won: 1,
      loss: 0,
    },
    profile: Avatar2,
  },
  {
    position: 3,
    address: "0x1234567890",
    xp: 100,
    score: {
      won: 1,
      loss: 0,
    },
    profile: Avatar3,
  },
];



function LeaderboardC() {
  const [leaderboardStats, setLeaderboard] = useState([]);
  const getLeaderboard = async () =>{
    const res = await axios.get(
        `${URL}/api/leaderboard?highscore=-1&limit=10`
      );
    const data = res.data.users; 
    const formattedResponse = data.map(player => ({
        address: player._id,
        wins: player.won,
        lose: player.lost,
        highScore: player.highScore,
      }))
    return formattedResponse;
}


  useEffect(() => {
    getLeaderboard().then((r) => setLeaderboard(r));
    console.log("get leaderboard call done",leaderboardStats)
  }, []);

  return (
    <div className="">
      <h3>Top 3 Players</h3>
      <div
        className=""
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        {leaderboardStats.map((player, i) => (
          <PlayerCard player={player} key={i} />
        ))}
      </div>
    </div>
  );
}

export default LeaderboardC;

const PlayerCard = ({ player }) => {
  const { address, xp, highScore , wins , lose } = player;
  return (
    <div
      className=""
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        paddingRight: "20px",

        height: "200px",
        // gradient border
        // border:"1px solid #D3D3D3",
        background: "rgba(15, 15, 15, 0.842)",
        backdropFilter: "blur(2px)",

        borderRadius: "10px",
        // padding:"10px",
        boxShadow: "0 20px 15px 0 rgba(36, 36, 36, 0.445)",
        
        transition: "all 0.3s ease-in-out",

        color: "white",
      }}
    >
      <img
        src={Avatar1}
        alt=""
        style={{
          // width:"200px",
          borderRadius: "10px",
          height: "200px",
        }}
      />
      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          // alignItems:"center",
        }}
      >
        <div
          className=""
          style={{
            // textAlign:"center",
            // border:"1px solid #d14fff",
            color: "#d14fff",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <p
            style={{
              border: "1px solid #d14fff",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            {address.slice(0, 5)}...{address.slice(-4)}
          </p>
          <h4
            style={{ textAlign: "center", marginTop: "10px", color: "white" }}
          >
            {highScore} Score
          </h4>

          <div className="" style={{
            display:"flex",
            textAlign:"center",
            justifyContent:"center",
            gap:"20px",
            marginTop:"10px"
          }}>
            <h5>{wins} Wins</h5>

            <h5>{lose} Loss</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
