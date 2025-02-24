// src/components/UI/LootBoxModal.js
import React from 'react';
import './LootBoxModal.css';

export default function LootBoxModal({ lootBoxes, onClaim, onDismiss }) {
    if (lootBoxes.length === 0) return null;
    // Display the first loot box upgrade for clarity.
    const loot = lootBoxes[0];
    return (
        <div className="lootbox-modal">
            <div className="lootbox-content">
                <h2>Loot Box Upgrade</h2>
                <p className="lootbox-name">{loot.name}</p>
                <p className="lootbox-description">{loot.description}</p>
                <p className="lootbox-effect">Boost: +{loot.effect}</p>
                <div className="lootbox-buttons">
                    <button className="claim-btn" onClick={onClaim}>Claim Upgrade</button>
                    <button className="dismiss-btn" onClick={onDismiss}>Dismiss</button>
                </div>
            </div>
        </div>
    );
}
