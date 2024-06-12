
type card = {
    count: number;
    rank: number;
};

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max) + 1
}

const cardCollection: card[] = [
    {rank: 1, count: 4},
    {rank: 2, count: 4},
    {rank: 3, count: 4},
    {rank: 4, count: 4},
    {rank: 5, count: 4},
    {rank: 6, count: 4},
    {rank: 7, count: 4},
    {rank: 8, count: 4},
    {rank: 9, count: 4},
    {rank: 10, count: 4},
    {rank: 10, count: 4},
    {rank: 10, count: 4},
    {rank: 10, count: 4},
    {rank: getRandomInt(10), count: 4},
]


const generateCard = cardCollection[getRandomInt(12)];

//TODO: Maybe need to make a hook that returns a player hand and a dealer hand.
//TODO: Need to make a function that generates a card and subtracts from the count
//TODO: Also need something, probs in a parent component that resets the game every round.

