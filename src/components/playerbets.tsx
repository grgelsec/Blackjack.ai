import { useState } from "react";

export default function Bet() {

    const [betAmount, setBetAmount] = useState(0);

    const incrementBetAmount = () => {
        setBetAmount((amount) => amount + 5)
    }

    const decrementBetAmount = () => {
        if (betAmount > 0){
            setBetAmount((amount) => amount -5)
        }
    }
    

    return (
        <>
        </>
    );

}