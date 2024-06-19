import { useState } from "react";
import HitOption from "./hit";
import StayOption from "./stay";
import ManageCards from "./gamelogic";
import Start from "./startgame";
import CardLayout from "./cards";

//TODO: Need the start game to ignite the game state

type card = {
  count: number;
  rank: number;
  suite: string;
};

export default function GameControls() {
  const [hit, setHitChoice] = useState(0);
  const [stay, setStayChoice] = useState(0);
  const [playerHand, setPlayerHand] = useState<card[]>([]);
  const [dealerHand, setDealerHand] = useState<card[]>([]);
  const [turn, setTurn] = useState(0);
  const [gameState, setGameState] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);
  const [startGame, setStartGame] = useState(false);

  //indicates if the game is going or not.
  function handleGameState() {
    setGameState(1);

    // setTimeout(() => {
    //   setGameState(0);
    // }, 1);
  }

  //indicates if player selects hit and resets
  function handleHit() {
    setTurn(1);
    // setTimeout(() => {
    //   setTurn(2);
    // }, 2);
  }

  //indicates if player selects stay and resets
  function handleStay() {
    setTurn(2);

    // setTimeout(() => {
    //   setTurn(2);
    // }, 2);
  }

  return (
    <>
      <body className="">
        <h1 className="text-3xl font-mono font-bold text-green-500 ring-2">
          Blackjack
        </h1>
        <div className="">
          <CardLayout playerHand={playerHand} dealerHand={dealerHand} />
        </div>
        <div className="">
          <div>
            <HitOption hit={hit} handleHit={handleHit} />
            <StayOption stay={stay} handleStay={handleStay} />
            <Start gameState={gameState} handleGameState={handleGameState} />
          </div>
        </div>
      </body>

      <ManageCards
        hit={hit}
        stay={stay}
        playerHand={playerHand}
        playerCount={playerCount}
        dealerCount={dealerCount}
        dealerHand={dealerHand}
        turn={turn}
        gameState={gameState}
      />
    </>
  );
}
