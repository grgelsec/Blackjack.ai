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
  }

//TODO: New problem, cards with count == 0 are being added to the hands. And the rd duplicate of a card os subtrascting lower than 0.

export default function ManageCards({
  hit,
  turn,
  setTurn,
  playerHand,
  setPlayerHand,
  dealerHand,
  setDealerHand,
}: ManageProps) {
  //selects a random index in cardCollection
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max + 1);
  };

  //db of cards available to the user
  const cardCollection: card[] = [
    { rank: 1, count: 3, suite: "one" },
    { rank: 2, count: 3, suite: "two" },
    { rank: 3, count: 3, suite: "three" },
    { rank: 4, count: 3, suite: "four" },
    { rank: 5, count: 3, suite: "five" },
    { rank: 6, count: 3, suite: "six" },
    { rank: 7, count: 3, suite: "seven" },
    { rank: 8, count: 3, suite: "eight" },
    { rank: 9, count: 3, suite: "nine" },
    { rank: 10, count: 3, suite: "ten" },
    { rank: 10, count: 3, suite: "jack" },
    { rank: 10, count: 3, suite: "queen" },
    { rank: 10, count: 3, suite: "king" },
    { rank: getRandomInt(11), count: 3, suite: "ace" },
  ];

  //search array to see if it contains a card with the same suite as the new card
  const findMatchingSuite = (hand: card[], newCard: card) => {
    //let copiesFound = 0;
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].suite == newCard.suite && hand[i].count > 0) {
        //copiesFound = copiesFound++
        cardCollection[i].count = cardCollection[i].count - 1;
        newCard.count = newCard.count - 1;
      }
    }
  };

  //adds card and adjusts the count accoding to exisitng cards in hand.

  const addCardToHand = (handOne: card[], handTwo: card[], turn: number) => {
    const cardIndex = getRandomInt(12);
    let generatedCard = cardCollection[cardIndex];
    if (cardCollection[cardIndex].count <= 0) {
      generatedCard = cardCollection[cardIndex];
    } else if (cardCollection[cardIndex].count > 0) {
      cardCollection[cardIndex].count = cardCollection[cardIndex].count - 1;
      findMatchingSuite(handOne, generatedCard);
      findMatchingSuite(handTwo, generatedCard);
      if(turn == 1) {
        handOne.push(generatedCard);
      } else if (turn == 2) {
        handTwo.push(generatedCard);
      }
    }
  };

  const ifPlayerHits = (handOne: card[], handTwo: card[], turn: number) => {
    if (hit == 1) {
      turn = 1
      return addCardToHand(handOne, handTwo, turn);
    } 
  };

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
  console.log("Turn: " + turn + " Hit: " + hit)
  console.log("Player hand: ")
  addCardToHand(playerHand, dealerHand, 1)
  console.log("Dealer hand: ")
  addCardToHand(playerHand, dealerHand, 2)
  console.log(playerHand);
  console.log(dealerHand);

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
