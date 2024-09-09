import { useState, useEffect } from "react";
import { ArrowRight, Square } from "lucide-react";
import useAI from "../hooks/fetchOpenAPI";
type PlayingCard = {
  rank: string;
  suit: string;
  value: number;
};

export default function BlackjackGame() {
  const [deck, setDeck] = useState<PlayingCard[]>([]);
  const [playerHand, setPlayerHand] = useState<PlayingCard[]>([]);
  const [dealerHand, setDealerHand] = useState<PlayingCard[]>([]);
  const [gameState, setGameState] = useState<
    "initial" | "playerTurn" | "dealerTurn" | "gameOver"
  >("initial");
  const [gameResult, setGameResult] = useState<string>("");
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [dealerScore, setDealerScore] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const { response } = useAI(input);

  useEffect(() => {
    initializeDeck();
  }, []);

  const initializeDeck = () => {
    const suits = ["♠", "♥", "♦", "♣"];
    const ranks = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    const newDeck: PlayingCard[] = [];

    for (const suit of suits) {
      for (const rank of ranks) {
        newDeck.push({
          rank,
          suit,
          value: getValue(rank),
        });
      }
    }

    setDeck(shuffleDeck(newDeck));
  };

  const shuffleDeck = (deck: PlayingCard[]) => {
    return [...deck].sort(() => Math.random() - 0.5);
  };

  const getValue = (rank: string): number => {
    if (rank === "A") return 11;
    if (["K", "Q", "J"].includes(rank)) return 10;
    return parseInt(rank);
  };

  const drawCard = (
    currentDeck: PlayingCard[]
  ): [PlayingCard, PlayingCard[]] => {
    const updatedDeck = [...currentDeck];
    const drawnCard = updatedDeck.pop()!;
    return [drawnCard, updatedDeck];
  };

  const initialDeal = async () => {
    setInput(
      "The player hit new game, this is your alert, please give them a run down of their options to hit or to stand."
    );
    let newDeck = shuffleDeck([...deck]);
    const newPlayerHand: PlayingCard[] = [];
    const newDealerHand: PlayingCard[] = [];

    // Deal two cards each to player and dealer
    for (let i = 0; i < 2; i++) {
      const [playerCard, updatedDeck1] = drawCard(newDeck);
      newPlayerHand.push(playerCard);
      newDeck = updatedDeck1;

      const [dealerCard, updatedDeck2] = drawCard(newDeck);
      newDealerHand.push(dealerCard);
      newDeck = updatedDeck2;
    }

    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setGameState("playerTurn");
    setGameResult("");

    const playerValue = calculateHandValue(newPlayerHand);
    setPlayerScore(playerValue);
    setDealerScore(calculateHandValue([newDealerHand[0]]));

    if (playerValue === 21) {
      endGame("Blackjack! Player Wins!");
    }
  };

  const calculateHandValue = (hand: PlayingCard[]) => {
    let total = 0;
    let aces = 0;
    hand.forEach((card) => {
      if (card.rank === "A") aces += 1;
      total += card.value;
    });
    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }
    return total;
  };

  const ifPlayerHits = () => {
    if (gameState === "playerTurn") {
      const [newCard, updatedDeck] = drawCard(deck);
      const newHand = [...playerHand, newCard];
      setPlayerHand(newHand);
      setDeck(updatedDeck);
      const handValue = calculateHandValue(newHand);
      setPlayerScore(handValue);
      setInput(
        `The players hand value is ${playerScore}, what would you advise the to do?`
      );
      if (handValue === 21) {
        endGame("Player hits 21! Player Wins!");
      } else if (handValue > 21) {
        endGame("Player Busts! Dealer Wins!");
      }
    }
  };

  const ifPlayerStays = () => {
    if (gameState === "playerTurn") {
      dealerTurn();
    }
  };

  const dealerTurn = () => {
    setGameState("dealerTurn");
    const currentDealerHand = [...dealerHand];
    let currentDeck = [...deck];

    // First, reveal the dealer's hidden card
    setDealerScore(calculateHandValue(currentDealerHand));

    let dealerValue = calculateHandValue(currentDealerHand);

    // Dealer draws additional cards only if their hand value is less than 17
    while (dealerValue < 17) {
      const [newCard, updatedDeck] = drawCard(currentDeck);
      currentDealerHand.push(newCard);
      currentDeck = updatedDeck;
      dealerValue = calculateHandValue(currentDealerHand);
    }

    setDealerHand(currentDealerHand);
    setDeck(currentDeck);
    setDealerScore(dealerValue);
    checkForWinner(currentDealerHand);
  };

  const checkForWinner = (finalDealerHand: PlayingCard[]) => {
    const playerTotal = calculateHandValue(playerHand);
    const dealerTotal = calculateHandValue(finalDealerHand);

    if (dealerTotal > 21) {
      endGame("Dealer Busts! Player Wins!");
    } else if (playerTotal > dealerTotal) {
      endGame("Player Wins!");
    } else if (dealerTotal > playerTotal) {
      endGame("Dealer Wins!");
    } else {
      endGame("It's a tie!");
    }
  };

  const endGame = (result: string) => {
    setGameState("gameOver");
    setGameResult(result);
    setInput(gameResult);
  };

  const renderCard = (card: PlayingCard, hidden: boolean = false) => (
    <div
      className={`w-16 h-24 md:w-20 md:h-28 rounded-lg flex items-center justify-center ${
        hidden ? "bg-emerald-700" : "bg-gray-200"
      } shadow-md`}
    >
      {hidden ? (
        <div className="w-full h-full flex items-center justify-center">
          <Square className="text-emerald-500" size={32} />
        </div>
      ) : (
        <div
          className={`text-2xl md:text-3xl font-bold ${
            ["♥", "♦"].includes(card.suit) ? "text-red-500" : "text-gray-800"
          }`}
        >
          {card.rank}
          <span className="text-base md:text-lg">{card.suit}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-emerald-900 to-emerald-700 text-gray-200 p-4 font-mono space-y-10">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-emerald-200">
        Blackjack
      </h1>
      <div className="w-full max-w-6xl bg-emerald-800 rounded-xl p-4 md:p-8 shadow-lg border border-emerald-600">
        <h1 className="flex justify-center w-full text-xl md:text-2xl font-semibold mb-2 text-emerald-300">
          Coach
        </h1>
        <p>{response}</p>
      </div>
      <div className="w-full max-w-6xl bg-emerald-800 rounded-xl p-4 md:p-8 shadow-lg border border-emerald-600">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-emerald-300">
            Dealer
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {dealerHand.map((card, index) => (
              <div
                key={index}
                className="transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2"
              >
                {renderCard(
                  card,
                  index === 1 &&
                    gameState !== "gameOver" &&
                    gameState !== "dealerTurn"
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-lg md:text-xl">
            Score:{" "}
            {gameState === "playerTurn"
              ? calculateHandValue([dealerHand[0]])
              : dealerScore}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-emerald-300">
            Player
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {playerHand.map((card, index) => (
              <div
                key={index}
                className="transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2"
              >
                {renderCard(card)}
              </div>
            ))}
          </div>
          <div className="mt-2 text-lg md:text-xl">Score: {playerScore}</div>
        </div>

        {gameState === "playerTurn" && (
          <div className="flex justify-center space-x-4 mb-4">
            <button
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full font-semibold transition-colors duration-300 text-lg md:text-xl"
              onClick={ifPlayerHits}
            >
              Hit
            </button>
            <button
              className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-full font-semibold transition-colors duration-300 text-lg md:text-xl"
              onClick={ifPlayerStays}
            >
              Stand
            </button>
          </div>
        )}

        {gameResult && (
          <div className="text-center mb-4">
            <div className="text-2xl md:text-3xl font-bold text-emerald-200">
              {gameResult}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-full font-semibold transition-colors duration-300 flex items-center text-lg md:text-xl"
            onClick={initialDeal}
          >
            New Game <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
