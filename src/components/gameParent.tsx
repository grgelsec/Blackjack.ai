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
  //const [turn, setTurn] = useState(0);

  function handleHit() {
    setHitChoice(Number(1));

    setTimeout(() => {
      setHitChoice(0);
    }, 1);
  }

  return (
    <>
      <HitOption hit={hit} handleHit={handleHit} />
      <StayOption stay={stay} handleStay={() => setStayChoice(1)} />
      <ManageCards
        hit={hit}
        playerHand={playerHand}
        setPlayerHand={setPlayerHand}
      />
    </>
  );
}
