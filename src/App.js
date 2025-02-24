// src/App.js
import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { useGameLogic } from './hooks/useGameLogic';

// Environment components
import Mountains from './components/Environment/Mountains';
import River from './components/Environment/River';
import Forest from './components/Environment/Forest';
import Sun from './components/Environment/Sun';
import Birds from './components/Environment/Birds';
import Grass from './components/Environment/Grass';

// UI components
import MoveableStatsBar from './components/UI/stats-bar/MoveableStatsBar';
import VolumeButton from './components/UI/volume-button/VolumeButton';
import UpgradePopup from './components/UI/upgrade-menu/UpgradePopup';
import LootBoxNotification from './components/UI/lootbox/LootBoxNotification';

// Game component
import Rock from './components/Game/Rock';

export default function App() {
    const {
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
        lootBoxNotifications,    // New array of notifications
        removeLootBoxNotification, // Function to remove a notification by id
        handleRockClick,
        purchaseUpgrade,
        claimOneLootBox,
        handlePrestige,
    } = useGameLogic();

    const [showUpgradePopup, setShowUpgradePopup] = useState(false);

    // Clear prestige notification after 3 seconds
    useEffect(() => {
        if (prestigeMessage) {
            const timer = setTimeout(() => {
                clearPrestigeMessage();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [prestigeMessage, clearPrestigeMessage]);

    return (
        <div className="App">
            {/* Draggable stats bar */}
            <MoveableStatsBar
                rocks={rocks}
                gems={gems}
                xp={xp}
                level={level}
                relaxationPoints={relaxationPoints}
                zenPoints={zenPoints}
                ascensionCount={ascensionCount}
            />

            <div className="volume-wrapper">
                <VolumeButton volume={volume} setVolume={setVolume} />
            </div>

            {/* Bottom–right container for Zen Points, Loot Box Icon, and Upgrade Button */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                zIndex: 1500,
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
            }}>
                <div
                    className="zen-points-display"
                    style={{
                        fontSize: '24px',
                        background: 'rgba(255,255,255,0.9)',
                        padding: '5px 10px',
                        borderRadius: '20px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                >
                    ☮️ <span className="zen-points-total">{zenPoints}</span>
                </div>
                <div
                    className="lootbox-icon"
                    onClick={() => claimOneLootBox()}
                    style={{
                        cursor: 'pointer',
                        fontSize: '24px',
                        background: 'rgba(255,255,255,0.9)',
                        padding: '5px 10px',
                        borderRadius: '20px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                >
                    🎁 <span className="lootbox-count">{lootBoxes.length}</span>
                </div>
                <button
                    className="open-upgrades-btn"
                    onClick={() => setShowUpgradePopup(true)}
                    style={{
                        padding: '10px 15px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Show Upgrades ↗️
                </button>
            </div>

            {/* Bottom–left container for stacked loot box notifications */}
            <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1500 }}>
                {lootBoxNotifications.map(notification => (
                    <LootBoxNotification
                        key={notification.id}
                        upgrade={notification}
                        onClear={() => removeLootBoxNotification(notification.id)}
                    />
                ))}
            </div>

            {showUpgradePopup && (
                <UpgradePopup
                    upgrades={upgrades}
                    onPurchase={purchaseUpgrade}
                    rocks={rocks}
                    gems={gems}
                    relaxationPoints={relaxationPoints}
                    onClose={() => setShowUpgradePopup(false)}
                    rockPerClick={rockPerClick}
                    xpPerClick={xpPerClick}
                    autoClickRate={autoClickRate}
                />
            )}

            <Mountains />
            <River />
            <Forest />
            <Sun />
            <Birds />
            <Grass />

            <h1>Therapy Rock</h1>
            <div id="world-content">
                <Rock onClick={handleRockClick} volume={volume} />
            </div>

            {level >= 10 && (
                <button
                    onClick={handlePrestige}
                    style={{
                        position: 'absolute',
                        bottom: '80px',
                        right: '20px',
                        padding: '10px 15px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Prestige (Ascend)
                </button>
            )}

            {prestigeMessage && (
                <div className="prestige-notification">
                    {prestigeMessage}
                </div>
            )}
        </div>
    );
}
