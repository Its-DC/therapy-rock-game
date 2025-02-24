import React, { useState, useEffect } from 'react';
import Tree from './Tree';

// Function to generate trees once per game session
const generateTrees = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100, // Random X position (0-100%)
        y: Math.random() * 40 + 30, // Random Y position (30-70% for depth)
        size: Math.random() * 40 + 50, // Size between 50-90px
    }));
};

const Forest = () => {
    const [trees, setTrees] = useState([]);

    // Generate trees only when the game starts
    useEffect(() => {
        setTrees(generateTrees(15)); // Adjust count for density
    }, []); // Empty dependency array → Runs only once

    return (
        <div style={styles.forest}>
            {trees.map(tree => (
                <Tree key={tree.id} x={tree.x} y={tree.y} size={tree.size} />
            ))}
        </div>
    );
};

const styles = {
    forest: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        zIndex: -3, // ✅ Above river, but below grass
    },
};

export default Forest;
