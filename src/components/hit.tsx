interface HitProps {
  hit: number;
  handleHit: React.FormEventHandler<HTMLButtonElement>;
}

export default function HitOption({ hit, handleHit }: HitProps) {
  return (
    <>
      <button
        value={hit}
        onClick={handleHit}
        className="p-4 bg-white rounded-xl font-mono"
      >
        Hit: {hit}
      </button>
    </>
  );
}
