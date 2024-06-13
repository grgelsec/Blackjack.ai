import { useState } from "react";
import HitOption from "./hit";
import StayOption from "./stay";
import ManageCards from "./gamelogic";

//TODO: add a way for the value to go back to false after their turn

type card = {
  count: number;
  rank: number;
  suite: string;
};

export default function GameControls() {
  const [hit, setHitChoice] = useState(0);
  const [stay, setStayChoice] = useState(0);
  const [playerHand, setPlayerHand] = useState<card[]>([]);
  const [turn, setTurn] = useState(0);

  //indicates if player selects hit and resets
  function handleHit() {
    setHitChoice(Number(1));

    setTimeout(() => {
      setHitChoice(0);
    }, 1);
  }

  //indicates if player selects stay and resets
  function handleStay() {
    setStayChoice(1);

    setTimeout(() => {
      setStayChoice(0);
    }, 1);
  }

  return (
    <>
      <HitOption hit={hit} handleHit={handleHit} />
      <StayOption stay={stay} handleStay={handleStay} />
      <ManageCards
        hit={hit}
        playerHand={playerHand}
        setPlayerHand={setPlayerHand}
        turn={turn}
      />
    </>
  );
}
