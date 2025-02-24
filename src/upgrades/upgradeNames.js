// src/upgrades/upgradeNames.js
const adjectives = ["Serene", "Mindful", "Calm", "Tranquil", "Zen", "Soothing", "Centered", "Balanced", "Harmonious"];
const rockNouns = ["Rock Booster", "Stone Amplifier", "Granite Enhancer", "Boulder Intensifier"];
const gemNouns = ["Gem Booster", "Crystal Enhancer", "Jewel Amplifier", "Shard Magnifier"];
const relaxationNouns = ["Relaxation Infusion", "Calming Surge", "Serenity Boost", "Tranquility Pulse"];
const autoclickNouns = ["Auto Clicker", "Automatic Tapping", "Self-Clicking Enhancer"];

export function generateUpgradeName(type) {
    let nounList;
    if (type === 'rocks') nounList = rockNouns;
    else if (type === 'gems') nounList = gemNouns;
    else if (type === 'relaxation') nounList = relaxationNouns;
    else if (type === 'autoclick') nounList = autoclickNouns;
    else nounList = ["Upgrade"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nounList[Math.floor(Math.random() * nounList.length)];
    return `${adjective} ${noun}`;
}

export function generateUpgradeEffect(base, variance) {
    return base + Math.floor(Math.random() * (variance + 1));
}