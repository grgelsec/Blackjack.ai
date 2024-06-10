import { useState } from "react";

//TODO: Need to show what the take home is for each bet, for submit onClick, calcualte what the take home is.

export default function Bet() {

    const [betAmount, setBetAmount] = useState<string | number>('');
    const bet: number = Number(betAmount)
    const [totalAmount, setTotalAmount] = useState<number>(0)

    const handleBet = (bet: number) => {
        setTotalAmount(totalAmount - bet)
    }
    

    return (
        <>
        <form className="flex items-center gap-x-2">
            <input 
            type="text" value={betAmount} onChange={e => setBetAmount(e.target.value)} className="px-2 py-1 rounded-xl bg-white font-mono"/>
            <button
            type="submit"
            className="px-4 py-4 rounded-xl bg-white">Submit</button>
        </form>
        <h1 className="text-white text-2xl">{totalAmount + bet}</h1>
        </>
    );


}