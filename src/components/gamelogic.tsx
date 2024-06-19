import { useState } from "react";

type card = {
  count: number;
  rank: number;
  suit: string;
};

export default function ManageCards() {
  const [playerHand, setPlayerHand] = useState<card[]>([]);
  const [dealerHand, setDealerHand] = useState<card[]>([]);
  //selects a random index in cardCollection
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max + 1);
  };

  //db of cards available to the user
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

  //generates a random card.
  const getCard = () => {
    const generatedCard = cardCollection[getRandomInt(13)];
    // while (generatedCard.count < 0) {
    //   cardIndex = getRandomInt(cardCollection.length);
    //   generatedCard = cardCollection[cardIndex];
    // }
    generatedCard.count -= 1;
    return generatedCard;
  };

  //search array to see if it contains a card with the same suite as the new card

  //adds card and adjusts the count accoding to exisitng cards in hand.
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
    checkForWinner();
  };

  //GAME LOGIC
  console.log(playerHand);
  console.log(dealerHand);

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
    <>
      <body className="flex col flex-wrap justify-center">
        <div className="flex col flex-wrap gap-3 w-3/12">
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
        <div className="flex justify-center items-center gap-3">
          <button
            className="px-4 py-4 bg-white rounded-xl font-mono"
            onClick={() => ifPlayerHits(1)}
          >
            Hit
          </button>
          <button
            className="px-4 py-4 bg-white rounded-xl font-mono"
            onClick={() => ifPlayerStays()}
          >
            Stay
          </button>
          <button
            className="px-4 py-4 bg-white rounded-xl font-mono"
            onClick={() => ifPlayerHits(1)}
          >
            Deal Player
          </button>
          <button
            className="px-4 py-4 bg-white rounded-xl font-mono"
            onClick={() => ifPlayerHits(0)}
          >
            Deal Dealer
          </button>
        </div>
        <h1 className="text-white text-3xl font-mono">{}</h1>
      </body>
    </>
  );
}
