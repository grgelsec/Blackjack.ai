type card = {
  rank: number;
  count: number;
  suite: string;
};
interface cardProps {
  playerHand: card[];
  dealerHand: card[];
}

export default function CardLayout({ playerHand, dealerHand }: cardProps) {
  return (
    <>
      <div className="flex flex-col space-y-10">
        <div className="flex row space-x-3">
          {dealerHand.map((card) => (
            <div className="py-8 px-6 bg-white text-xl text-red-500 font-mono rounded-xl text-md">
              {card.rank}
            </div>
          ))}
        </div>
        <div className="flex row space-x-3">
          {playerHand.map((card) => (
            <div className="py-8 px-6 bg-white text-xl text-red-500 font-mono rounded-xl text-md">
              {card.rank}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
