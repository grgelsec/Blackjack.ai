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

//TODO: change the count if there is a duplicate card, currently not working.

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

  //adds card depending on the count
  function addCardToHand(hand: card[]) {
    const generatedCard = cardCollection[getRandomInt(12)];
    if (generatedCard.count > 0) {
      generatedCard.count - 1;
      hand.push(generatedCard);
    }
  }

  //   function addMultipleCards(hand: card[], handCount: number) {
  //     for (let i = 1; i <= handCount; i++) {
  //       addCardToHand(hand);
  //     }
  //   }

  //If the the user selects hit, add a card to the hand.
  function ifPlayerHits(hand: card[]) {
    if (hit == 1) {
      return addCardToHand(hand);
    }
  }

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
