interface startProps {
  gameState: number;
  handleGameState: React.FormEventHandler<HTMLButtonElement>;
}

export default function Start({ gameState, handleGameState }: startProps) {
  return (
    <>
      <button
        value={gameState}
        onClick={handleGameState}
        className="px-4 py-4 bg-white rounded-xl font-mono"
      >
        Start Game
      </button>
    </>
  );
}
