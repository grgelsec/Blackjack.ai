import { useState } from "react";

type card = {
  count: number;
  rank: number;
  suit: string;
};

export default function ManageCards() {
  const [playerHand, setPlayerHand] = useState<card[]>([]);
  const [dealerHand, setDealerHand] = useState<card[]>([]);

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max + 1);
  };

  const cardCollection: card[] = [
    { rank: 1, count: 4, suit: "one" },
    { rank: 2, count: 4, suit: "two" },
    { rank: 3, count: 4, suit: "three" },
    { rank: 4, count: 4, suit: "four" },
    { rank: 5, count: 4, suit: "five" },
    { rank: 6, count: 4, suit: "six" },
    { rank: 7, count: 4, suit: "seven" },
    { rank: 8, count: 4, suit: "eight" },
    { rank: 9, count: 4, suit: "nine" },
    { rank: 10, count: 4, suit: "ten" },
    { rank: 10, count: 4, suit: "jack" },
    { rank: 10, count: 4, suit: "queen" },
    { rank: 10, count: 4, suit: "king" },
    { rank: getRandomInt(12), count: 4, suit: "ace" },
  ];

  const getCard = () => {
    const generatedCard = cardCollection[getRandomInt(12)];
    generatedCard.count -= 1;
    return generatedCard;
  };

  const addCardToHand = (turn: number) => {
    const newCard = getCard();
    if (turn === 1) {
      setPlayerHand([...playerHand, newCard]);
    } else if (turn === 0) {
      setDealerHand([...dealerHand, newCard]);
    }
  };

  const calculateHandValue = (hand: card[]) => {
    let total = 0;
    hand.forEach((card) => {
      total += card.rank;
    });
    return total;
  };

  const ifPlayerHits = (turn: number) => {
    return addCardToHand(turn);
  };

  const ifPlayerStays = () => {
    dealerTurn();
  };

  const dealerTurn = () => {
    addCardToHand(0);
    checkForWinner();
  };

  const checkForWinner = () => {
    const playerTotal = calculateHandValue(playerHand);
    const dealerTotal = calculateHandValue(dealerHand);

    if (playerTotal > 21) {
      console.log("Player Busts! Dealer Wins!");
    } else if (dealerTotal > 21) {
      console.log("Dealer Busts! Player Wins!");
    } else if (playerTotal > dealerTotal) {
      console.log("Player Wins!");
    } else if (dealerTotal > playerTotal) {
      console.log("Dealer Wins!");
    } else {
      console.log("It's a tie!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white mt-60">
      <h1 className="text-4xl font-mono mb-6">Blackjack</h1>
      <div className="flex space-x-10 mb-6">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl mb-2">Dealer's Hand</h2>
          <div className="flex gap-3 ring-2 ring-red-500 p-4 rounded-lg">
            {dealerHand.map((card, index) => (
              <div
                key={index}
                className="py-2 px-4 bg-white text-xl text-red-500 font-mono rounded-xl"
              >
                {card.rank}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl mb-2">Player's Hand</h2>
          <div className="flex gap-3 ring-2 ring-blue-500 p-4 rounded-lg">
            {playerHand.map((card, index) => (
              <div
                key={index}
                className="py-2 px-4 bg-white text-xl text-blue-500 font-mono rounded-xl"
              >
                {card.rank}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-6 mb-6">
        <button
          className="px-6 py-3 bg-green-500 rounded-xl font-mono text-lg"
          onClick={() => ifPlayerHits(1)}
        >
          Hit
        </button>
        <button
          className="px-6 py-3 bg-yellow-500 rounded-xl font-mono text-lg"
          onClick={ifPlayerStays}
        >
          Stay
        </button>
      </div>
      <div className="flex gap-6">
        <button
          className="px-6 py-3 bg-purple-500 rounded-xl font-mono text-lg"
          onClick={() => ifPlayerHits(1)}
        >
          Deal Player
        </button>
        <button
          className="px-6 py-3 bg-red-500 rounded-xl font-mono text-lg"
          onClick={() => ifPlayerHits(0)}
        >
          Deal Dealer
        </button>
      </div>
    </div>
  );
}
