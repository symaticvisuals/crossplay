import React, { useContext, useEffect, useState } from 'react'
import InputField from './InputField'
import pattern from '../../img/zigzag_small.png'
import {
  useWeb3ModalState,
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from '@web3modal/ethers/react'
import { useSelector } from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { createGame, removeGame } from '../../api/operations/teztris';
import { manageFunc } from '../../App';
import { CONFIG, getChainNameByChainId } from '../../common/const';




function CreateGame({swapFunc}) {
  
  const socket = useSelector((state) => state.socket.socket); 
  const {gameIdInput, setGameIdInput , setCreatedGame } = useContext(manageFunc);
  const [tokenIndex , setTokenIndex] = useState(0);
  const [tokenAmount , setTokenAmount] = useState(0);
  const [alias , setAlisa] = useState("");
  const [createGameEmit, setCreateGameEmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [matchFoundData, setMatchFoundData] = useState('');
  const [startGameID , setStartGameID] = useState(null);


  const navigate = useNavigate();

  const { walletProvider } =  useWeb3ModalProvider();


  // useEffect(()=>{
  //   if(createGameEmit){
  //     alert("createGameEmit Done")
  //   }
  // },[createGameEmit])

 
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const { address, chainId, isConnected } = useWeb3ModalAccount()


  const createGameHandle = async() =>{
    if (createGameEmit){
      alert("Game already exisit")
      return
    }
    if (tokenAmount<=0){
      alert("Amount must be greater than 0")
      return
    }
    setLoading(true)
    let tuid = uuidv4();
    setGameIdInput(tuid);

    const createGameJson = {
      "uuid": tuid,
      "isPublic": true,
      "alias": alias,
      "chain": getChainNameByChainId(chainId), //config se
      "obj": {
          "amount": tokenAmount,
          "betToken": "ETH",
          "betTokenType": "ETH",
          "betTokenName": "ETH"
      }
    }
  
    // console.log(createGameJson)
    enqueueSnackbar('Creating game, please verify from your wallet.', {anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    }}, { variant: 'info' })
    console.log(createGameJson,"create game json")
    console.log(CONFIG[getChainNameByChainId(chainId)].ADDRESS,"create game json")
    const createGameApi = await createGame(tokenAmount,tuid,walletProvider,CONFIG[getChainNameByChainId(chainId)].ADDRESS);
    if (createGameApi.success === true) {
      socket.emit("createNewGame", createGameJson);
      enqueueSnackbar('Game created successfully.', {anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }, variant: 'success' })
      setCreateGameEmit(true);
      setCreatedGame(true);
    }
    else{
      alert("CreateGame Failed")
    }
      setLoading(false)
  }

  const handleRefund = async () => {
    const removeGameApi = await removeGame(gameIdInput,walletProvider,CONFIG[getChainNameByChainId(chainId)].ADDRESS);
    console.log(gameIdInput,"remove game api")
    if(removeGameApi.success){
      // console.log("Game Removed")
      socket.emit("refundGame");
    }
    else{
      alert("unable to refund game")
    }

  }

  useEffect(()=>{
    if(socket){
      socket.on('game-refunded', (data)=>{
        // console.log(data,"create game")
        setGameIdInput(null);
        setCreateGameEmit(false);
        setCreatedGame(false);
      })
    }
  },[])
  // navigate("/app", { replace: true });

  // listen for "matchFound" or error messages
  useEffect(()=>{
    if(socket){
      socket.on('old-game-found', (data)=>{
        // console.log(data,"create game")
        setGameIdInput(data._id);
        setCreateGameEmit(true);
        setCreatedGame(true);
      })
    }
  },[])

    useEffect(()=>{
      if(socket){
        socket.on('start-game',(data)=>{
          setStartGameID(data._id)
        })
      }
    },[])
  
  useEffect(()=>{
    if((startGameID && gameIdInput) && (startGameID == gameIdInput)){
          navigate("/app", { replace: true });
    }
  },[startGameID,gameIdInput])
  const handleAlisa = (event) =>{
    setAlisa(event.target.value);
  }
  
  // console.log(matchFoundData,response,"matchdata, response")
  return (
    <div className='createGame'>
            <div className='card'>
                <div className='center'>
                <h1>Create Game</h1>
                    <InputField placeholder="Bet token amount" setTokenIndex={setTokenIndex} setTokenAmount={setTokenAmount} tokenAmount={tokenAmount}/>
                    <input className='room-name-input' type="text" onChange={handleAlisa} placeholder='Room name'></input>
                    { createGameEmit ? 
                        <div className='game-details'>
                          <p>Game created, waiting for opponent to join</p>
                          <span>{gameIdInput}</span>
                          <div className='cancel-game' onClick={handleRefund}>cancel game</div>
                       </div> : 
                       <img className = "join" src={pattern}></img>}
                    
                    <a href="#" onClick={()=>createGameHandle()} className="orange-btn">
                      {
                      loading ? "Loading..." : createGameEmit? "Waiting..." : "Create Game"
                      }
                    </a>
                </div>
                
            </div> 
            <div className='blue-btn' onClick={()=>swapFunc(true)}>
                Join Game
            </div>
    </div>
  )
}

export default CreateGame