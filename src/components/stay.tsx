interface StayProps {
    stay: number;
    handleStay: React.FormEventHandler<HTMLButtonElement>;
}

export default function StayOption({ stay, handleStay }: StayProps) {

    return(
        <>
        <button value={stay} onClick={handleStay} className="p-4 bg-white rounded-xl font-mono">Stay {stay}</button>
        </>
    );
}