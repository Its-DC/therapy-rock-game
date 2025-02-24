import React from 'react';

const River = () => {
    return (
        <svg
            viewBox="0 0 100 15"
            preserveAspectRatio="xMidYMax meet"
            width="100%"
            height="15%"
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: -4,
                pointerEvents: 'none',
            }}
        >
            {/* Smooth Flowing River Path */}
            <path
                d="M0,12 C25,10 40,14 60,11 C80,8 100,12 100,15 L0,15 Z"
                fill="#1E90FF"
                fillOpacity="0.7"
            />
        </svg>
    );
};

export default River;
