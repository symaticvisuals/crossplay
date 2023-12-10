import { useEffect, useState } from "react";
import styles from "./scss/Leaderboard.module.scss";
import axios from "axios";
import { URL } from "../../api/socket";
import { useQuery } from "@airstack/airstack-react";

const query = `
query MyQuery {
  Wallet(input: {identity: "vitalik.eth", blockchain: ethereum}) {
    socials {
      dappName
      profileName
    }
    addresses
  }
}`;



function Leaderboard() {
    const [LeaderboardStats, setLeaderboard] = useState([]);
  
    const getLeaderboard = async () => {
      const res = await axios.get(`${URL}/api/leaderboard?highscore=-1&limit=10`);
      const data = res.data.users;
      const formattedResponse = data.map((player) => ({
        address: player._id,
        wins: player.won,
        lose: player.lost,
        highScore: player.highScore,
        tezDomain: player.tezDomain, // Assuming tezDomain is part of player data
      }));
      return formattedResponse;
    };
  
    useEffect(() => {
      getLeaderboard().then((r) => setLeaderboard(r));
    }, []);
  
    return (
      <div className={styles.card}>
        <h1>Leaderboard</h1>
        <div className="list">
        {console.log(LeaderboardStats)}
          {LeaderboardStats.map((player, i) => (
            <PlayerEntry key={i} index={i} player={player} />
          ))}
        </div>
      </div>
    );
  }


function PlayerEntry({ player, index }) {

   


    return (
        
      <div className="player">
        {console.log(player, index)}
      
        {index >= 3 ? (
          <div className={styles.rank}>#{index + 1}</div>
        ) : (
          <div className={styles.rank + " " + styles.top}>#{index + 1}</div>
        )}
        {player.tezDomain ? (
          <div className="playerDetails">
            <div className="tezDomain">{player.tezDomain}</div>
            <div className="address">
              {player.address.slice(0, 5)}...{player.address.slice(-4)}
            </div>
          </div>
        ) : (
          <div className="playerDetails">
            <div className="address noDomain">
              {player.address.slice(0, 5)}...{player.address.slice(-4)}
            </div>
          </div>
        )}
        <div className="score">
          <p>{player.highScore}</p>
        </div>
        <div className="stats">
          <div className="wins">{player.wins} won</div>
          <div className="lose">{player.lose} lost</div>
        </div>
      </div>
    );
  }

export default Leaderboard;
