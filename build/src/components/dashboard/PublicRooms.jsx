import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createGame } from '../../api/operations/teztris';
import { useNavigate } from 'react-router-dom';
import { manageFunc } from '../../App';
import "../../components/dashboard/scss/GameCards.css"
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount
} from '@web3modal/ethers/react'
import { CONFIG, getChainNameByChainId } from '../../common/const';

function PublicRooms() {
  const socket = useSelector((state) => state.socket.socket);
  const { gameIdInput, setGameIdInput, createdGame } = useContext(manageFunc);
  const navigate = useNavigate();
  const { walletProvider } =  useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount()

  const rooms = [
    {
      name: "room one",
      betAmount: "12",
    },
    {
      name: "room two",
      betAmount: "15",
    },
    {
      name: "room three",
      betAmount: "8",
    },
  ];

  // const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlecreateGame = async (room) => {
    if (!room) {
      alert("no match data found");
      return;
    }
    if (createdGame) {
      alert("cant join a game, end your created game first!");
      return;
    }
    setLoading(true);
      const createGameApi = await createGame(room.tokenData.amount,room.roomId,walletProvider,CONFIG[getChainNameByChainId(chainId)].ADDRESS);
      // const createGameApi = await createGame(room.tokenData.amount,room.tokenData.betToken,room.tokenData.betTokenId,room.tokenData.betTokenType,6,room.roomId);
      if (createGameApi.success === true) {
      socket.emit('playerJoins', {"gameId":room.roomId,"opponentChain":getChainNameByChainId(chainId)})
      setGameIdInput(room.roomId)
      console.log(gameIdInput)
      navigate("/app",{replace:true});

    }
    setLoading(false);
  };

  useEffect(() => {
    if (socket) {
      socket.on("public-rooms", (data) => {
        const updatedRooms = data.publicRooms.map((room) => {
          return {
            name: room.alias,
            roomId: room.gameId,
            betAmount:
              room.tokenData.amount + " " + room.tokenData.betTokenName,
            tokenData: room.tokenData,
          };
        });
        // setRooms(updatedRooms);
      });
    }
  }, []);

  return (
    <div
      className=""
      style={{
        background: "rgba(15, 15, 15, 0.842)",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>Public Room</h1>
      <div className="roomsTable">
        <div
          className=""
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {rooms.map((room, index) => (
            <RoomCard
              room={room}
              key={index}
              handlecreateGame={() => handlecreateGame(room)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PublicRooms;

const RoomCard = ({ room }) => {
  const { name, betAmount, handlecreateGame } = room;
  return (
    <div className="" style={{
      padding:"20px",
      borderRadius:"10px",
      background:"rgba(15, 15, 15, 0.842)",
      border :"1px solid #D3D3D3",
      display:"flex",
      justifyContent:"space-around",
      alignItems:"center",
    }}>
      <div className="" style={{}}>

      <div className="room-name">{name}</div>
      <div className="bet-amount">{betAmount} ETH </div>

      </div>
      <div className="button">
        <button onClick={handlecreateGame} 
        style={{
          background:"#d14fff",
          color:"white",
          padding:"10px",
          borderRadius:"10px",
          border:"none",
          cursor:"pointer",
        }}
        >Join</button>
      </div>
    </div>
  );
};
