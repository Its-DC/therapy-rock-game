// Stats.js
import React from 'react';
import { FaGem, FaArrowUp, FaLeaf, FaBalanceScale } from 'react-icons/fa';

const Stats = ({ rocks, gems, xp, level, relaxationPoints, zenPoints, ascensionCount, draggable }) => {
    const baseStyle = {
        padding: '0px',
        display: 'flex',
        flexDirection: 'row',
        gap: '15px',
        color: 'white',
        fontSize: '18px',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const containerStyle = draggable
        ? { ...baseStyle, position: 'relative', top: 0, left: 0, transform: 'none' }
        : { ...baseStyle, position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)' };

    const itemStyle = { display: 'flex', alignItems: 'center', gap: '5px' };
    const iconStyle = { fontSize: '20px' };
    const labelStyle = { fontWeight: 'bold' };
    const valueStyle = { fontSize: '18px', color: '#FFD700' };

    return (
        <div style={containerStyle}>
            <div style={itemStyle}>
                <FaGem style={iconStyle} />
                <span style={labelStyle}>Rocks:</span>
                <span style={valueStyle}>{rocks}</span>
            </div>
            <div style={itemStyle}>
                <FaGem style={iconStyle} />
                <span style={labelStyle}>Gems:</span>
                <span style={valueStyle}>{gems}</span>
            </div>
            <div style={itemStyle}>
                <FaArrowUp style={iconStyle} />
                <span style={labelStyle}>XP:</span>
                <span style={valueStyle}>{xp}</span>
            </div>
            <div style={itemStyle}>
                <FaArrowUp style={iconStyle} />
                <span style={labelStyle}>Level:</span>
                <span style={valueStyle}>{level}</span>
            </div>
            <div style={itemStyle}>
                <FaLeaf style={iconStyle} />
                <span style={labelStyle}>Relax:</span>
                <span style={valueStyle}>{relaxationPoints}</span>
            </div>
            <div style={itemStyle}>
                <FaBalanceScale style={iconStyle} />
                <span style={labelStyle}>Zen:</span>
                <span style={valueStyle}>{zenPoints}</span>
            </div>
            <div style={itemStyle}>
                <span style={labelStyle}>Ascensions:</span>
                <span style={valueStyle}>{ascensionCount}</span>
            </div>
        </div>
    );
};

export default Stats;
