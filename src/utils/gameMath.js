// src/utils/gameMath.js
export function xpNeededForLevel(level, xpBase = 100, xpGrowth = 1.15) {
    return Math.floor(xpBase * Math.pow(xpGrowth, level - 1));
}
export function gemRewardForLevel(newLevel, gemBase = 5, gemScale = 0.07) {
    return Math.floor(gemBase * Math.pow(1 + gemScale, newLevel - 1));
}
export function purchaseCost(baseCost, costGrowth, purchases) {
    return Math.floor(baseCost * Math.pow(costGrowth, purchases));
}
export function clamp2Decimals(value) {
    return parseFloat(value.toFixed(2));
}