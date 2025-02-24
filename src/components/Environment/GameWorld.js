// GameWorld.js
import React from 'react';
import Mountains from './Mountains';
import River from './River';
import Forest from './Forest';
import Sun from './Sun';
import Birds from './Birds';
import Grass from './Grass';

export default function GameWorld() {
    return (
        <>
            <Mountains />
            <River />
            <Forest />
            <Sun />
            <Birds />
            <Grass />
        </>
    );
}
