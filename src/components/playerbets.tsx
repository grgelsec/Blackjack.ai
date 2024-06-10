import { useState } from "react";

export default function Bet() {

    const [betAmount, setBetAmount] = useState<string | number>('');
    const bet = Number(betAmount)
    console.log(bet)
    

    return (
        <>
        <form className="flex items-center gap-x-2">
            <input 
            type="text" value={betAmount} onChange={e => setBetAmount(e.target.value)} className="px-2 py-1 rounded-xl bg-white font-mono"/>
            <button
            type="submit"
            onClick={() => setBetAmount(bet)}
            className="px-4 py-4 rounded-xl bg-white">Submit</button>
        </form>
        </>
    );


}