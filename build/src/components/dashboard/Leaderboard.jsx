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

const getSocialQuery = (address) => {
  return `query MyQuery {
        Socials(
          input: {filter: {identity: {_eq: "${address}"}}, blockchain: ethereum}
        ) {
          Social {
            
            dappName
            dappSlug
           
            profileName
            profileTokenId
            
            profileImageContentValue {
              json
            }
            coverImageContentValue {
              json
            }
            twitterUserName
           
          }
        }
      }`;
};


function getTokenBalance(address){
    return `query MyQuery {
  Ethereum: TokenBalances(
    input: {filter: {owner: {_eq: "${address}"}}, blockchain: ethereum, limit: 50}
  ) {
    TokenBalance {
      id
      chainId
      blockchain
      tokenAddress
      tokenId
      owner {
        identity
      }
      amount
      formattedAmount
      lastUpdatedBlock
      lastUpdatedTimestamp
      tokenType
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
  Polygon: TokenBalances(
    input: {filter: {owner: {_eq: "${address}"}}, blockchain: polygon, limit: 50}
  ) {
    TokenBalance {
      id
      chainId
      blockchain
      tokenAddress
      tokenId
      owner {
        identity
      }
      amount
      formattedAmount
      lastUpdatedBlock
      lastUpdatedTimestamp
      tokenType
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
  Base: TokenBalances(
    input: {filter: {owner: {_eq: "${address}"}}, blockchain: base, limit: 50}
  ) {
    TokenBalance {
      id
      chainId
      blockchain
      tokenAddress
      tokenId
      owner {
        identity
      }
      amount
      formattedAmount
      lastUpdatedBlock
      lastUpdatedTimestamp
      tokenType
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
}`;
}

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
          {LeaderboardStats.map((player, i) => (
            <PlayerEntry key={i} index={i} player={player} />
          ))}
        </div>
      </div>
    );
  }


function PlayerEntry({ player, index }) {

    const { data: socialData, loading: socialLoading, error: socialError } = useQuery(getSocialQuery(player.address));
    const { data: tokenData, loading: tokenLoading, error: tokenError } = useQuery(getTokenBalance(player.address));

    if (socialLoading || tokenLoading) return <div>Loading...</div>;
    if (socialError || tokenError) return <div>Error</div>;


    return (
        
      <div className="player">
        {console.log(player, index)}
        {console.log(socialData, tokenData)}
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
