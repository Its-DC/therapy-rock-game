// src/hooks/useGameLogic.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { xpNeededForLevel, gemRewardForLevel, purchaseCost, clamp2Decimals } from '../utils/gameMath';
import { generateUpgrades } from '../upgrades/generateUpgrades';

export function useGameLogic(initialXpBase = 100, xpGrowth = 1.15) {
    // Existing state variables...
    const [rocks, setRocks] = useState(0);
    const [gems, setGems] = useState(0.0);
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [relaxationPoints, setRelaxationPoints] = useState(0);
    const [volume, setVolume] = useState(0.01);
    const [rockPerClick, setRockPerClick] = useState(1);
    const [xpPerClick, setXpPerClick] = useState(10);
    const [zenPoints, setZenPoints] = useState(0);
    const [upgrades, setUpgrades] = useState(generateUpgrades());
    const [lootBoxes, setLootBoxes] = useState([]);
    const [prestigeMessage, setPrestigeMessage] = useState("");
    const [autoClickRate, setAutoClickRate] = useState(0);
    const [ascensionCount, setAscensionCount] = useState(0);
    const [lastLootUpgrade, setLastLootUpgrade] = useState(null);

    // NEW: State for stacking loot box notifications
    const [lootBoxNotifications, setLootBoxNotifications] = useState([]);

    const lastLootBoxLevelRef = useRef(0);

    const handleRockClick = useCallback(() => {
        setRocks(prev => prev + rockPerClick);
        setGems(prev => clamp2Decimals(prev + 0.1));
        setXp(prev => {
            const newXp = prev + xpPerClick;
            const requiredXp = xpNeededForLevel(level, initialXpBase, xpGrowth);
            if (newXp >= requiredXp) {
                const leftover = newXp - requiredXp;
                const newLevel = level + 1;
                setLevel(newLevel);
                const gemBonus = gemRewardForLevel(newLevel, 5, 0.07);
                setGems(prevGems => clamp2Decimals(prevGems + gemBonus));
                setRelaxationPoints(prev => prev + (5 * newLevel));
                if (newLevel > lastLootBoxLevelRef.current) {
                    // For loot boxes, add a new loot box upgrade (free upgrade)
                    const loot = generateUpgrades()[Math.floor(Math.random() * 3)];
                    setLootBoxes(prev => [...prev, { ...loot, free: true }]);
                    lastLootBoxLevelRef.current = newLevel;
                }
                return leftover;
            }
            return newXp;
        });
    }, [rockPerClick, xpPerClick, level, initialXpBase, xpGrowth]);

    const handleRockClickRef = useRef(handleRockClick);
    useEffect(() => {
        handleRockClickRef.current = handleRockClick;
    }, [handleRockClick]);

    useEffect(() => {
        if (autoClickRate > 0) {
            const interval = setInterval(() => {
                for (let i = 0; i < autoClickRate; i++) {
                    handleRockClickRef.current();
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [autoClickRate]);

    function purchaseUpgrade(upgradeId) {
        let currRocks = rocks;
        let currGems = gems;
        let currRelax = relaxationPoints;
        let autoClickIncrease = 0;
        let purchased = false;

        const updatedUpgrades = upgrades.map(upg => {
            if (upg.id !== upgradeId) return upg;
            if (upg.free) return upg;
            const cost = purchaseCost(upg.baseCost, upg.costGrowth, upg.purchases);
            if (upg.type === 'rocks' || upg.type === 'autoclick') {
                if (currRocks < cost) return upg;
                currRocks -= cost;
                purchased = true;
                if (upg.type === 'rocks') {
                    setRockPerClick(prev => prev + upg.effect);
                } else if (upg.type === 'autoclick') {
                    autoClickIncrease += upg.effect;
                }
            } else if (upg.type === 'gems') {
                if (currGems < cost) return upg;
                currGems = clamp2Decimals(currGems - cost);
                purchased = true;
                setXpPerClick(prev => prev + upg.effect);
            } else if (upg.type === 'relaxation') {
                if (currRelax < cost) return upg;
                currRelax -= cost;
                purchased = true;
            }
            return { ...upg, purchases: upg.purchases + 1 };
        });

        if (purchased) {
            setRocks(currRocks);
            setGems(currGems);
            setRelaxationPoints(currRelax);
            if (autoClickIncrease > 0) {
                setAutoClickRate(prev => prev + autoClickIncrease);
            }
            setUpgrades(updatedUpgrades);
        }
    }

    // Modify claimOneLootBox to add a loot box notification
    function claimOneLootBox() {
        setLootBoxes(prevLootBoxes => {
            if (prevLootBoxes.length === 0) return prevLootBoxes;
            const loot = prevLootBoxes[0];
            if (loot.type === 'rocks') {
                setRockPerClick(prev => prev + loot.effect);
            } else if (loot.type === 'gems') {
                setXpPerClick(prev => prev + loot.effect);
            } else if (loot.type === 'autoclick') {
                setAutoClickRate(prev => prev + loot.effect);
            }
            // Save this loot as the last loot upgrade (optional if you want a separate "latest" display)
            setLastLootUpgrade(loot);
            // Add this loot upgrade to the notifications stack. Use a unique id.
            const notification = { ...loot, id: Date.now() };
            setLootBoxNotifications(prev => [...prev, notification]);
            return prevLootBoxes.slice(1);
        });
    }

    function handlePrestige() {
        if (level < 10) return; // Only allow prestige if level is 10 or higher
        const zenReward = Math.floor(level * 1.5);
        setZenPoints(prevZen => prevZen + zenReward);
        setPrestigeMessage(`You have ascended! You earned ${zenReward} Zen Points.`);
        setAscensionCount(prev => prev + 1);
        // Reset stats
        setRocks(0);
        setGems(0.0);
        setXp(0);
        setLevel(1);
        setRelaxationPoints(0);
        setRockPerClick(1);
        setXpPerClick(10);
        setUpgrades(generateUpgrades());
        setLootBoxes([]);
        lastLootBoxLevelRef.current = 0;
    }

    const clearPrestigeMessage = useCallback(() => {
        setPrestigeMessage("");
    }, []);

    const clearLastLootUpgrade = useCallback(() => {
        setLastLootUpgrade(null);
    }, []);

    // NEW: Function to remove a notification by id from the notifications stack
    const removeLootBoxNotification = useCallback((id) => {
        setLootBoxNotifications(prev => prev.filter(notif => notif.id !== id));
    }, []);

    return {
        rocks,
        gems,
        xp,
        level,
        relaxationPoints,
        volume,
        setVolume,
        zenPoints,
        upgrades,
        lootBoxes,
        prestigeMessage,
        clearPrestigeMessage,
        autoClickRate,
        rockPerClick,
        xpPerClick,
        ascensionCount,
        lastLootUpgrade,
        clearLastLootUpgrade,
        handleRockClick,
        purchaseUpgrade,
        claimOneLootBox,
        handlePrestige,
        lootBoxNotifications,         // Return the notifications array
        removeLootBoxNotification,    // Return the function to remove notifications
    };
}
