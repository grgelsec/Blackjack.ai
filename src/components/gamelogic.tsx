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
  const [input, setInput] = useState<string>(
    "Hello, please explain the rules, concisely. Make sure you cover what it means to hit and stand."
  );

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
      setInput("Blackjack! Player Wins!");
    }

    setInput(
      `The game has start and the initial score of the player's hand is ${playerValue} and the initial score of the dealers hand is ${calculateHandValue(
        [newDealerHand[0]]
      )}, please make note of the scores and advise the player on what to do next. Dont go over hit and stand again, just tell them what the best option would be.`
    );
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
      console.log(handValue);
      //console.log("Dealer score:", dealerScore);
      setInput(
        `The player's score is ${handValue} and the dealer's score is ${dealerScore}, please make note of the scores and advise the player on what to do next. Dont go over hit and stand again, just tell them what the best option would be.`
      );
      if (handValue === 21) {
        endGame("Player hits 21! Player Wins!");
        setInput("Player hits 21! Player Wins!");
      } else if (handValue > 21) {
        endGame("Player Busts! Dealer Wins!");
        setInput("Player Busts! Dealer Wins!");
      }
    }
  };

  const ifPlayerStays = () => {
    setInput(
      `The player's score is ${playerScore} and the dealer's score is ${dealerScore}, please make note of the scores and advise the player on what to do next. Dont go over hit and stand again, just tell them what the best option would be.`
    );
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
      setInput("Dealer Busts! Player Wins!");
    } else if (playerTotal > dealerTotal) {
      endGame("Player Wins!");
      setInput("Player Wins!");
    } else if (dealerTotal > playerTotal) {
      endGame("Dealer Wins!");
      setInput("Dealer Wins!");
    } else {
      endGame("It's a tie!");
      setInput("It's a tie!");
    }
  };

  const endGame = (result: string) => {
    setGameState("gameOver");
    setGameResult(result);
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

  const { response } = useAI(input);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-codblack p-4 font-mono space-y-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-500 text-transparent bg-clip-text pb-2">
        Blackjack
      </h1>
      <div className="w-full max-w-6xl bg-codblack rounded-xl p-6 md:p-10 shadow-[0_0_15px_rgba(16,185,129,0.1)] border border-emerald-900">
        <div className="bg-black bg-opacity-50 rounded-lg p-4 md:p-6 shadow-inner">
          <h2 className="flex justify-center w-full text-xl md:text-2xl font-semibold mb-4 text-emerald-400">
            Coach
          </h2>
          <p className="text-center text-gray-300">{response}</p>
        </div>
      </div>
      <div className="w-full max-w-6xl bg-codblack rounded-xl p-6 md:p-10 shadow-[0_0_15px_rgba(16,185,129,0.1)] border border-emerald-900">
        <div className="bg-black bg-opacity-50 rounded-lg p-4 md:p-6 shadow-inner">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-emerald-400 text-center">
              Dealer
            </h2>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
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
            <div className="text-lg md:text-xl text-center text-emerald-500 font-bold">
              Score:{" "}
              <span className="font-bold text-emerald-400">
                {gameState === "playerTurn"
                  ? calculateHandValue([dealerHand[0]])
                  : dealerScore}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-emerald-400 text-center">
              Player
            </h2>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {playerHand.map((card, index) => (
                <div
                  key={index}
                  className="transition-all duration-300 ease-in-out hover:transform hover:-translate-y-2"
                >
                  {renderCard(card)}
                </div>
              ))}
            </div>
            <div className="text-lg md:text-xl text-center text-emerald-500 font-bold">
              Score:{" "}
              <span className="font-bold text-emerald-400">{playerScore}</span>
            </div>
          </div>

          {gameState === "playerTurn" && (
            <div className="flex justify-center space-x-4 mb-6 text-white">
              <button
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-full font-semibold transition-colors duration-300 text-lg md:text-xl"
                onClick={ifPlayerHits}
              >
                Hit
              </button>
              <button
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-full font-semibold transition-colors duration-300 text-lg md:text-xl"
                onClick={ifPlayerStays}
              >
                Stand
              </button>
            </div>
          )}

          {gameResult && (
            <div className="text-center mb-6">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">
                {gameResult}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-full font-semibold transition-colors duration-300 flex items-center text-lg md:text-xl text-white"
              onClick={initialDeal}
            >
              New Game <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
