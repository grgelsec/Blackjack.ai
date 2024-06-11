
interface BetProps {
    betAmount: number;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Bet({ betAmount, handleChange }: BetProps){

    return (
        <>
        <form className="flex items-center gap-x-2">
            <input 
            type="text" 
            value={betAmount} 
            onChange={handleChange} 
            className="px-2 py-1 rounded-xl bg-white font-mono"/>
            <button
            type="submit"
            className="px-4 py-4 rounded-xl bg-white">Submit</button>
        </form>
        </>
    );


} 