import React, { useState } from 'react';

// Function to get a random color
const getRandomColor = () => {
    const colors = ['#556B2F', '#6B8E23', '#228B22', '#32CD32'];
    return colors[Math.floor(Math.random() * colors.length)];
};

// Function to randomly choose a tree type
const getRandomTreeType = () => {
    const types = ['triangle', 'circle', 'square'];
    return types[Math.floor(Math.random() * types.length)];
};

const Tree = ({ x, y, size }) => {
    const [treeColor] = useState(getRandomColor());
    const [treeType] = useState(getRandomTreeType());

    return (
        <svg
            viewBox="0 0 100 100"
            width={size}
            height={size}
            style={{
                position: 'absolute',
                left: `${x}%`,
                bottom: `${y}%`,
                transform: `translateX(-50%)`,
            }}
        >
            {/* Trunk */}
            <rect x="45" y="70" width="10" height="30" fill="#8B4513" />

            {/* Different tree styles */}
            {treeType === 'triangle' && <polygon points="50,10 80,70 20,70" fill={treeColor} />}
            {treeType === 'circle' && <circle cx="50" cy="40" r="30" fill={treeColor} />}
            {treeType === 'square' && <rect x="30" y="30" width="40" height="40" fill={treeColor} />}
        </svg>
    );
};

export default Tree;
