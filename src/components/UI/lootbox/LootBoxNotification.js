// src/components/UI/lootbox/LootBoxNotification.js
import React, { useEffect } from 'react';
import './LootBoxNotification.css';

const LootBoxNotification = ({ upgrade, onClear }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClear();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClear]);

    return (
        <div className="lootbox-notification-toast">
            <span className="notification-title">Loot Box Applied:</span>
            <span className="notification-upgrade">{upgrade.name}</span>
            <span className="notification-description">{upgrade.description}</span>
            <span className="notification-effect">Boost: +{upgrade.effect}</span>
        </div>
    );
};

export default LootBoxNotification;
