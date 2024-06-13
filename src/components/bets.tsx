interface BetProps {
  betAmount: number;
  handleChangeBet: React.ChangeEventHandler<HTMLInputElement>;
}

//recieve alert whether player won the round or busted. if they won then add or subract from their balance

export default function Bet({ betAmount, handleChangeBet }: BetProps) {
  return (
    <>
      <form className="flex items-center gap-x-2">
        <input
          type="text"
          value={betAmount}
          onChange={handleChangeBet}
          className="px-2 py-1 rounded-xl bg-white font-mono"
        />
        <button type="submit" className="px-4 py-4 rounded-xl bg-white">
          Submit
        </button>
      </form>
      <h1 className="text-white text-xl font-mono p-3 rounded-xl underline">
        Bet: {betAmount}
      </h1>
      <h1 className="text-white text-xl font-mono p-3 rounded-xl underline">
        On the table: {}
      </h1>
      <h1 className="text-white text-xl font-mono p-3 rounded-xl underline">
        Balance: {}
      </h1>
    </>
  );
}
