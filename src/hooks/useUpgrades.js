// src/hooks/useUpgrades.js
import { useState } from 'react';
import { purchaseCost } from '../utils/gameMath';

const adjectives = ["Serene", "Mindful", "Calm", "Tranquil", "Zen", "Soothing"];
const rockNouns = ["Rock Booster", "Stone Amplifier", "Granite Enhancer"];
const gemNouns = ["Gem Booster", "Crystal Enhancer", "Jewel Amplifier"];
const relaxationNouns = ["Relaxation Infusion", "Calming Surge", "Serenity Boost"];

function generateUpgradeName(type) {
    let nounList = type === 'rocks' ? rockNouns : type === 'gems' ? gemNouns : relaxationNouns;
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nounList[Math.floor(Math.random() * nounList.length)];
    return `${adjective} ${noun}`;
}

function generateUpgradeEffect(base, variance) {
    return base + Math.floor(Math.random() * (variance + 1));
}

export function generateUpgrades() {
    return [
        {
            id: 1,
            name: generateUpgradeName('rocks'),
            type: 'rocks',
            baseCost: 25,
            costGrowth: 1.15,
            purchases: 0,
            effect: generateUpgradeEffect(1, 1),
            description: 'Increases Rock production by +1 per click.'
        },
        {
            id: 2,
            name: generateUpgradeName('gems'),
            type: 'gems',
            baseCost: 10,
            costGrowth: 1.20,
            purchases: 0,
            effect: generateUpgradeEffect(5, 2),
            description: 'Boosts XP per click by the specified amount.'
        },
        {
            id: 3,
            name: generateUpgradeName('relaxation'),
            type: 'relaxation',
            baseCost: 15,
            costGrowth: 1.20,
            purchases: 0,
            effect: generateUpgradeEffect(5, 2),
            description: 'Enhances your idle relaxation gain.'
        }
    ];
}

export function useUpgrades() {
    const [upgrades, setUpgrades] = useState(generateUpgrades());

    // Attempts to purchase an upgrade and returns updated resource values.
    function purchaseUpgrade(upgradeId, resources) {
        let newResources = { ...resources };
        const updatedUpgrades = upgrades.map(u => {
            if (u.id !== upgradeId) return u;
            const cost = purchaseCost(u.baseCost, u.costGrowth, u.purchases);
            if (u.type === 'rocks' && newResources.rocks < cost) return u;
            if (u.type === 'gems' && newResources.gems < cost) return u;
            if (u.type === 'relaxation' && newResources.relaxationPoints < cost) return u;
            if (u.type === 'rocks') newResources.rocks -= cost;
            else if (u.type === 'gems') newResources.gems -= cost;
            else newResources.relaxationPoints -= cost;
            return { ...u, purchases: u.purchases + 1 };
        });
        setUpgrades(updatedUpgrades);
        return newResources;
    }

    return { upgrades, purchaseUpgrade, setUpgrades };
}
