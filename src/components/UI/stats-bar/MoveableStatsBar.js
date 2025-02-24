// MoveableStatsBar.js
import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import Stats from './Stats'; // Ensure Stats uses relative positioning when draggable
import './MoveableStatsBar.css';

const MoveableStatsBar = ({ rocks, gems, xp, level, relaxationPoints }) => {
    // Default dimensions: 90% of viewport width (capped at 1200px) and centered horizontally, 10px from the top.
    const defaultWidth = Math.min(window.innerWidth * 0.9, 1200);
    const defaultX = (window.innerWidth - defaultWidth) / 2;
    const defaultY = 10;

    // Dimensions state holds width, height, and position.
    const [dimensions, setDimensions] = useState({
        width: defaultWidth,
        height: 'auto',
        x: defaultX,
        y: defaultY,
    });

    // Visibility state for closing/opening the stats bar.
    const [visible, setVisible] = useState(true);

    // Reset the position and size back to defaults.
    const resetPosition = () => {
        setDimensions({
            width: defaultWidth,
            height: 'auto',
            x: defaultX,
            y: defaultY,
        });
    };

    // If the stats bar is closed, render an "Open Stats" button.
    if (!visible) {
        return (
            <button
                className="open-stats-button"
                onClick={() => setVisible(true)}
                style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999 }}
            >
                Open Stats
            </button>
        );
    }

    return (
        <Rnd
            dragHandleClassName="drag-handle"
            bounds="window"
            size={{ width: dimensions.width, height: dimensions.height }}
            position={{ x: dimensions.x, y: dimensions.y }}
            minWidth={507}
            minHeight={177}
            enableResizing={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                topRight: true,
                bottomRight: true,
                bottomLeft: true,
                topLeft: true,
            }}
            snap={{
                x: [0, window.innerWidth],
                y: [0, window.innerHeight],
            }}
            snapGap={20}
            onDragStop={(e, d) =>
                setDimensions((prev) => ({ ...prev, x: d.x, y: d.y }))
            }
            onResizeStop={(e, direction, ref, delta, position) =>
                setDimensions({
                    width: ref.offsetWidth,
                    height: ref.offsetHeight,
                    x: position.x,
                    y: position.y,
                })
            }
            className="moveable-stats-rnd"
            style={{ zIndex: 9999 }}
        >
            <div className="moveable-stats-container">
                <div className="drag-handle moveable-stats-header">
                    <span className="moveable-stats-title">Stats</span>
                    <div className="header-buttons">
                        <button className="reset-button" onClick={resetPosition}>
                            Reset
                        </button>
                        <button className="close-button" onClick={() => setVisible(false)}>
                            Close
                        </button>
                    </div>
                </div>
                <div className="moveable-stats-content">
                    <Stats
                        draggable={true}
                        rocks={rocks}
                        gems={gems}
                        xp={xp}
                        level={level}
                        relaxationPoints={relaxationPoints}
                    />
                </div>
            </div>
        </Rnd>
    );
};

export default MoveableStatsBar;
