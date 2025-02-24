// Stats.js
import React from 'react';
import { FaGem, FaArrowUp, FaLeaf } from 'react-icons/fa';

export default function Stats({ rocks, gems, xp, level, relaxationPoints }) {
    return (
        <div style={styles.statsInner}>
            <div style={styles.statItem}>
                <FaGem style={styles.icon} />
                <span style={styles.label}>Rocks:</span>
                <span style={styles.value}>{rocks}</span>
            </div>
            <div style={styles.statItem}>
                <FaGem style={styles.icon} />
                <span style={styles.label}>Gems:</span>
                <span style={styles.value}>{gems}</span>
            </div>
            <div style={styles.statItem}>
                <FaArrowUp style={styles.icon} />
                <span style={styles.label}>Level:</span>
                <span style={styles.value}>{level}</span>
            </div>
            <div style={styles.statItem}>
                <FaArrowUp style={styles.icon} />
                <span style={styles.label}>XP:</span>
                <span style={styles.value}>{xp}</span>
            </div>
            <div style={styles.statItem}>
                <FaLeaf style={styles.icon} />
                <span style={styles.label}>Relaxation:</span>
                <span style={styles.value}>{relaxationPoints}</span>
            </div>
        </div>
    );
}

const styles = {
    statsInner: {
        width: '90%',            // Uses 90% of the viewport width, leaving room on each side
        maxWidth: '1200px',       // Optional: limit maximum width
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '10px 15px',
        borderRadius: '8px',
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '10px 15px',
        borderRadius: '8px',
        flex: 1,
        margin: '0 5px',
    },
    icon: {
        fontSize: '24px',
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        fontSize: '20px',
        color: '#FFD700',
    },
};
