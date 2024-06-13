import { useState } from "react";
import Bet from "./bets";

export default function MoneyRecord() {
  const [betAmount, setBetAmount] = useState(0);

  //sets the state of the bet amount of the user types into the form.
  function handleChangeBet(e: React.ChangeEvent<HTMLInputElement>) {
    setBetAmount(Number(e.target.value));
  }

  return (
    <>
      <Bet betAmount={betAmount} handleChangeBet={handleChangeBet} />
    </>
  );
}
