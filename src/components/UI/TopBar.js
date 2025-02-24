// TopBar.js
import React from 'react';
import Stats from './Stats';
import VolumeButton from './VolumeButton';
import UpgradeMenu from './UpgradeMenu';

/**
 * Props:
 *  - rocks, gems, xp, level, relaxationPoints
 *  - volume, setVolume
 *  - upgrades, onPurchase
 */
export default function TopBar({
    rocks,
    gems,
    xp,
    level,
    relaxationPoints,
    volume,
    setVolume,
    upgrades,
    onPurchase,
}) {
    return (
        <div className="top-container">

            {/* Left side => Stats */}
            <div className="stats-container">
                <Stats
                    rocks={rocks}
                    gems={gems}
                    xp={xp}
                    level={level}
                    relaxationPoints={relaxationPoints}
                />
            </div>

            {/* Right side => can hold Volume button, Upgrade Menu, etc. */}
            <div className="menu-container">
                {/* If you want the Upgrade Menu up here as well, put it here */}
                {/* <UpgradeMenu
          upgrades={upgrades}
          onPurchase={onPurchase}
          rocks={rocks}
          gems={gems}
          relaxationPoints={relaxationPoints}
        /> */}

                <VolumeButton volume={volume} setVolume={setVolume} />
            </div>

        </div>
    );
}
