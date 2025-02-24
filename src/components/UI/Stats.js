import React from 'react';
import { FaGem, FaArrowUp, FaLeaf } from 'react-icons/fa';

export default function Stats({ rocks, gems, xp, level, relaxationPoints }) {
    return (
        <div style={styles.statsContainer}>
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
                <span style={styles.label}>Relaxation Points:</span>
                <span style={styles.value}>{relaxationPoints}</span>
            </div>
        </div>
    );
};

const styles = {
    statsContainer: {
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '10px 15px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'row',
        gap: '15px',
        color: 'white',
        fontSize: '18px',
        zIndex: 10,
    },
    statItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    icon: {
        fontSize: '20px',
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        fontSize: '18px',
        color: '#FFD700',
    },
};
