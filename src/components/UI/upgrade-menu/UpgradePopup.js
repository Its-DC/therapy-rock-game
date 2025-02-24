// src/components/UI/UpgradePopup.js
import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { purchaseCost } from '../../../utils/gameMath';
import './UpgradePopup.css';

export default function UpgradePopup({
    upgrades,
    onPurchase,
    rocks,
    gems,
    relaxationPoints,
    onClose,
    rockPerClick,
    xpPerClick,
    autoClickRate
}) {
    const [filter, setFilter] = useState('all');

    const filteredUpgrades = upgrades.filter(upg => {
        if (filter === 'all') return true;
        return upg.type === filter;
    });

    return (
        <Rnd
            default={{ x: 100, y: 100, width: 346, height: 400 }}
            minWidth={250}
            minHeight={300}
            bounds="window"
            className="upgrade-popup-rnd"
            style={{
                userSelect: 'auto',
                display: 'inline-block',
                boxSizing: 'border-box',
                flexShrink: 0
            }}
        >
            <div className="popup-container">
                <div className="popup-header">
                    <span className="popup-title">Upgrade Menu</span>
                    <button className="popup-close" onClick={onClose}>X</button>
                </div>
                <div className="filter-buttons">
                    <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
                    <button onClick={() => setFilter('rocks')} className={filter === 'rocks' ? 'active' : ''}>Rocks</button>
                    <button onClick={() => setFilter('gems')} className={filter === 'gems' ? 'active' : ''}>Gems</button>
                    <button onClick={() => setFilter('relaxation')} className={filter === 'relaxation' ? 'active' : ''}>Relaxation</button>
                    <button onClick={() => setFilter('autoclick')} className={filter === 'autoclick' ? 'active' : ''}>Autoclick</button>
                </div>
                <div className="popup-content">
                    {filteredUpgrades.map(upg => {
                        const cost = purchaseCost(upg.baseCost, upg.costGrowth, upg.purchases);
                        const canAfford =
                            upg.type === 'rocks' || upg.type === 'autoclick'
                                ? rocks >= cost
                                : upg.type === 'gems'
                                    ? gems >= cost
                                    : upg.type === 'relaxation'
                                        ? relaxationPoints >= cost
                                        : true;
                        return (
                            <button
                                key={upg.id}
                                className={`upgrade-card ${canAfford ? '' : 'locked'}`}
                                onClick={() => { if (canAfford) onPurchase(upg.id); }}
                                disabled={!canAfford}
                            >
                                <div className="upgrade-left">
                                    <div className="upgrade-header">
                                        <span className="upgrade-name">{upg.name}</span>
                                        {!canAfford && <span className="lock-icon">🔒</span>}
                                    </div>
                                    <div className="upgrade-cost">
                                        Cost: {cost} {upg.type === 'rocks' || upg.type === 'autoclick' ? 'Rocks' : upg.type === 'gems' ? 'Gems' : 'Relaxation'}
                                    </div>
                                </div>
                                <div className="upgrade-right">
                                    <div className="upgrade-effect">Boost: +{upg.effect}</div>
                                    <div className="upgrade-description">{upg.description}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>
                <div className="boost-summary">
                    <div>Rocks/Click: {rockPerClick}</div>
                    <div>XP/Click: {xpPerClick}</div>
                    <div>Auto-Click Rate: {autoClickRate}</div>
                </div>
            </div>
        </Rnd>
    );
}
