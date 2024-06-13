//types coming from gameParent.tsx
interface StayProps {
  stay: number;
  handleStay: React.FormEventHandler<HTMLButtonElement>;
}

//component that displays the stay button to the user
export default function StayOption({ stay, handleStay }: StayProps) {
  return (
    <>
      <button
        value={stay}
        onClick={handleStay}
        className="p-4 bg-white rounded-xl font-mono"
      >
        Stay {stay}
      </button>
    </>
  );
}
