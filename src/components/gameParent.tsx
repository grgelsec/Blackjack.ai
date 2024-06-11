import { useState } from "react";
import HitOption from "./hit";
import StayOption from "./stay";

//TODO: add a way for the value to go back to false after their turn

export default function GameControls() {

    const [hit, setHitChoice] = useState(0);
    const [stay, setStayChoice] = useState(0);

    // function handleHit(e: React.ChangeEvent<HTMLButtonElement>) {
    //     setHitChoice(Number(e.target.value))
    // }

    return (
        <>
            <HitOption hit={hit} handleHit={() => setHitChoice(1)}/>
            <StayOption stay={stay} handleStay={() => setStayChoice(1)} />
        </>
    );
}