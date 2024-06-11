import { useState } from "react";
import Bet from "./playerbets";

export default function Testing(){

    const [betAmount, setBetAmount] = useState(0);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setBetAmount(Number(e.target.value))
    }

    return(
        <>
            <Bet betAmount={betAmount} handleChange={handleChange} />
        </>
    );
}