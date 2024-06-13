//interface for types coming from parent component gameParent.tsx
interface HitProps {
  hit: number;
  handleHit: React.FormEventHandler<HTMLButtonElement>;
}

//displays hit option to the user
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
