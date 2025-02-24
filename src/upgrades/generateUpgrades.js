// src/upgrades/generateUpgrades.js
import { generateUpgradeName, generateUpgradeEffect } from './upgradeNames';

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
            description: 'Increases Rock production per click.'
        },
        {
            id: 2,
            name: generateUpgradeName('gems'),
            type: 'gems',
            baseCost: 10,
            costGrowth: 1.20,
            purchases: 0,
            effect: generateUpgradeEffect(5, 2),
            description: 'Boosts XP per click.'
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
        },
        {
            id: 4,
            name: generateUpgradeName('autoclick'),
            type: 'autoclick',
            baseCost: 50,
            costGrowth: 1.25,
            purchases: 0,
            effect: generateUpgradeEffect(1, 1),
            description: 'Increases your auto-click rate by 1 per second.'
        }
    ];
}