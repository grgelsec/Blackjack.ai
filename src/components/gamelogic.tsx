type card = {
  count: number;
  rank: number;
  suite: string;
};

//indicates types from parnet component gameParent.tsx
interface ManageProps {
  hit: number;
  turn: number;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
  playerHand: card[];
  setPlayerHand: React.Dispatch<React.SetStateAction<card[]>>;
  dealerHand: card[];
  setDealerHand: React.Dispatch<React.SetStateAction<card[]>>;
  gameState: number;
  setGameState: React.Dispatch<React.SetStateAction<number>>;
}

//TODO: New problem, cards with count == 0 are being added to the hands and when the same card gets called at the same time, it subtracts more. maybe see if i can get rid of findmatchingsuite

export default function ManageCards({
  hit,
  turn,
  setTurn,
  playerHand,
  setPlayerHand,
  dealerHand,
  setDealerHand,
  gameState,
  setGameState,
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
    { rank: 11, count: 4, suite: "ace" },
  ];

  const getCard = () => {
    const cardIndex = getRandomInt(12);
    let generatedCard = cardCollection[cardIndex];
    while (generatedCard.count < 0) {
      generatedCard = cardCollection[getRandomInt(12)];
    }
    return generatedCard;
  };

  // const getCard = () => {
  //   let generatedCard: card;
  //   do {
  //     const cardIndex = getRandomInt(cardCollection.length);
  //     generatedCard = cardCollection[cardIndex];
  //   } while (generatedCard.count <= 0);
  //   return generatedCard;
  // };

  //search array to see if it contains a card with the same suite as the new card
  const findMatchingSuite = (
    handOne: card[],
    handTwo: card[],
    newCard: card
  ) => {
    for (let i = 0; i < handOne.length; i++) {
      if (handOne[i].suite == newCard.suite && handOne[i].count > 0) {
        newCard.count -= 1;
      }
    }
    for (let i = 0; i < handTwo.length; i++) {
      if (handTwo[i].suite == newCard.suite && handTwo[i].count > 0) {
        newCard.count -= 1;
      }
    }
  };

  //adds card and adjusts the count accoding to exisitng cards in hand.
  const addCardToHand = (handOne: card[], handTwo: card[], turn: number) => {
    const cardOne = getCard();
    findMatchingSuite(handOne, handTwo, cardOne);
    if (turn === 1) {
      handOne.push(cardOne);
    } else if (turn === 2) {
      handTwo.push(cardOne);
    }
  };

  const ifPlayerHits = (handOne: card[], handTwo: card[], turn: number) => {
    if (hit == 1) {
      hit = 0;
      return addCardToHand(handOne, handTwo, turn);
    }
  };

  const startGame = () => {
    if (gameState == 1) {
      gameState = 0;
      addCardToHand(playerHand, dealerHand, 1);
      addCardToHand(playerHand, dealerHand, 1);
    }
  };
  startGame();
  ifPlayerHits(playerHand, dealerHand, 1);
  console.log(gameState);
  console.log(playerHand);
  console.log(hit);
  console.log(turn);
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
