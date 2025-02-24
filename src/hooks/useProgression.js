// src/hooks/useProgression.js
import { useState } from 'react';
import {
    xpNeededForLevel,
    gemRewardForLevel,
    clamp2Decimals
} from '../utils/gameMath';
export function useProgression(initialXpBase = 100, xpGrowth = 1.15) {
    const [rocks, setRocks] = useState(0);
    const [gems, setGems] = useState(0.0);
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [relaxationPoints, setRelaxationPoints] = useState(0);
    const [rockPerClick, setRockPerClick] = useState(1);
    const [xpPerClick, setXpPerClick] = useState(10);
    const [zenPoints, setZenPoints] = useState(0);
    function handleClick() {
        const newRocks = rocks + rockPerClick;
        const newGems = clamp2Decimals(gems + 0.1); // Fractional gem gain per click
        let newXp = xp + xpPerClick;
        let newLevel = level;
        let newRelax = relaxationPoints;

        const requiredXp = xpNeededForLevel(level, initialXpBase, xpGrowth);
        if (newXp >= requiredXp) {
            const leftoverXp = newXp - requiredXp;
            newLevel = level + 1;
            const gemBonus = gemRewardForLevel(newLevel, 5, 0.07);
            newGems = clamp2Decimals(newGems + gemBonus);
            newRelax += 5 * newLevel;
            newXp = leftoverXp;
            setLevel(newLevel);
        }
        setRocks(newRocks);
        setGems(newGems);
        setXp(newXp);
        setRelaxationPoints(newRelax);
    }
    function handlePrestige() {
        if (level < 10) return; // Only allow prestige if level is 10 or higher
        const zenReward = Math.floor(level * 1.5); // Example formula for Zen Points
        setZenPoints(prevZen => prevZen + zenReward);
        setRocks(0);
        setGems(0.0);
        setXp(0);
        setLevel(1);
        setRelaxationPoints(0);
        setRockPerClick(1);
        setXpPerClick(10);
    }

    return {
        rocks,
        gems,
        xp,
        level,
        relaxationPoints,
        rockPerClick,
        xpPerClick,
        zenPoints,
        handleClick,
        handlePrestige,
        setRockPerClick,
        setXpPerClick,
        setRocks,
        setGems,
        setXp,
        setLevel,
    };
}