type card = {
  count: number;
  rank: number;
  suite: string;
};

//indicates types from parnet component gameParent.tsx
interface ManageProps {
  hit: number;
  turn: number;
  playerHand: card[];
  setPlayerHand: React.Dispatch<React.SetStateAction<card[]>>;
}

export default function ManageCards({
  hit,
  turn,
  playerHand,
  setPlayerHand,
}: ManageProps) {
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

  //selects a random index in cardCollection
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max + 1);
  }

  //search array to see if it contains a card with the same suite as the new card
  function findMatchingSuite(hand: card[], newCard: card) {
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].suite == newCard.suite) {
        newCard.count = newCard.count - 1;
      }
    }
  }

  //adds card and adjusts the count accoding to exisitng cards in hand.
  function addCardToHand(hand: card[]) {
    const cardIndex = getRandomInt(12);
    const generatedCard = cardCollection[cardIndex];
    if (generatedCard.count > 0) {
      generatedCard.count = generatedCard.count - 1;
      findMatchingSuite(hand, generatedCard);
      hand.push(generatedCard);
    }
  }

  function ifPlayerHits(hand: card[]) {
    if (hit == 1) {
      return addCardToHand(hand);
    }
  }

  //   function addMultipleCards(hand: card[], handCount: number) {
  //     for (let i = 1; i <= handCount; i++) {
  //       addCardToHand(hand);
  //     }
  //   }

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

  //NEED TO DO SAME THING FOR DEALER HAND
  ifPlayerHits(playerHand);
  console.log(playerHand);

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
