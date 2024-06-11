import { useState } from "react";
import Bet from "./playerbets";

export default function Testing(){

    const [betAmount, setBetAmount] = useState(0);

    function handleChangeBet(e: React.ChangeEvent<HTMLInputElement>) {
        setBetAmount(Number(e.target.value))
    }

    return(
        <>
            <Bet betAmount={betAmount} handleChangeBet={handleChangeBet} />
        </>
    );
}