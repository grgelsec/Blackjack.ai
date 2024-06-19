type card = {
  count: number;
  rank: number;
  suite: string;
};

//indicates types from parnet component gameParent.tsx
interface ManageProps {
  hit: number;
  stay: number;
  turn: number;
  playerHand: card[];
  dealerHand: card[];
  gameState: number;
  playerCount: number;
  dealerCount: number;
}

//TODO: New problem, cards with count == 0 are being added to the hands and when the same card gets called at the same time, it subtracts more. maybe see if i can get rid of findmatchingsuite

export default function ManageCards({
  hit,
  stay,
  turn,
  playerHand,
  dealerHand,
  gameState,
  playerCount,
  dealerCount,
}: ManageProps) {
  //selects a random index in cardCollection
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max + 1);
  };

  //db of cards available to the user
  const cardCollection: card[] = [
    { rank: 1, count: 4, suite: "one" },
    { rank: 2, count: 4, suite: "two" },
    { rank: 3, count: 4, suite: "three" },
    { rank: 4, count: 4, suite: "four" },
    { rank: 5, count: 4, suite: "five" },
    { rank: 6, count: 4, suite: "six" },
    { rank: 7, count: 4, suite: "seven" },
    { rank: 8, count: 4, suite: "eight" },
    { rank: 9, count: 4, suite: "nine" },
    { rank: 10, count: 4, suite: "ten" },
    { rank: 10, count: 4, suite: "jack" },
    { rank: 10, count: 4, suite: "queen" },
    { rank: 10, count: 4, suite: "king" },
    { rank: getRandomInt(12), count: 4, suite: "ace" },
  ];

  //generates a random card.
  const getCard = () => {
    let cardIndex = getRandomInt(cardCollection.length);
    let generatedCard = cardCollection[cardIndex];
    while (generatedCard.count <= 0) {
      cardIndex = getRandomInt(cardCollection.length);
      generatedCard = cardCollection[cardIndex];
    }
    cardCollection[cardIndex].count -= 1;
    return generatedCard;
  };

  //search array to see if it contains a card with the same suite as the new card
  const findMatchingSuite = (handOne: card[], newCard: card) => {
    for (let i = 0; i < handOne.length; i++) {
      if (handOne[i].suite == newCard.suite && handOne[i].count > 0) {
        newCard.count -= 1;
      }
    }
  };

  //adds card and adjusts the count accoding to exisitng cards in hand.
  const addCardToHand = (hand: card[], turn: number) => {
    const newCard = getCard();
    if (turn === 1) {
      hand.push(newCard);
    } else if (turn === 0) {
      hand.push(newCard);
    }
  };

  const calculateHandValue = (hand: card[]) => {
    let total = 0;
    hand.forEach((card) => {
      total += card.rank;
    });
    return total;
  };

  const ifPlayerHits = (hand: card[], turn: number) => {
    if (turn === 1) {
      return addCardToHand(hand, turn);
    }
  };

  const ifPlayerStays = (turn: number) => {
    if (turn === 0) {
      return;
    }
  };

  const dealerTurn = () => {
    while (calculateHandValue(dealerHand) < 17) addCardToHand(dealerHand, 0);
  };

  //GAME LOGIC

  console.log(playerHand);
  console.log(dealerHand);
  console.log("Game State: " + gameState);
  console.log("Game Turn: " + turn);

  /*
   game starts and the cards are dealt to the user and dealer(bot)
   turn is 1 (user)
   if player selects hit or stay, set hit to 1 or stay to 1
   set turn to 0
   delay for a second or two
   need to calculate the sum of the player deck
   display dealers second card
   if dealer sum is 16 or less, they hit, if sum is > 21, they bust
   if dealter sum is 17 or more, the stay. if user or dealer is closer to 21 then they win
   when turn is 0, then the robot does its thing
   */

  //adds cards depending on player choice

  return (
    <>
      <div>
        {/* {playerHand.map((card) => (
          <div className="p-4 bg-white text-red-500 font-mono text-md">
            {card.rank}
          </div>
        ))} */}
      </div>
    </>
  );
}
