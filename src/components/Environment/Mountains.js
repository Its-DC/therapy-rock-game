import React from 'react';

const Mountains = () => {
    return (
        <svg
            viewBox="0 0 100 50" /* ✅ Increased height to push mountains higher */
            preserveAspectRatio="xMidYMax meet"
            width="100%"
            height="50%" /* ✅ Ensures they always take up the upper part */
            style={{
                position: 'absolute',
                bottom: '50%', /* ✅ Moves mountains above the halfway mark */
                left: '0',
                zIndex: 2, /* ✅ Moves mountains above the grass but below UI elements */
                pointerEvents: 'none',
            }}
        >
            {/* Back Layer Mountains */}
            <polygon points="0,50 25,20 50,50" fill="#4A4A4A" />
            <polygon points="30,50 60,10 90,50" fill="#3B3B3B" />
            <polygon points="70,50 90,15 120,50" fill="#4A4A4A" />

            {/* Front Layer Mountains */}
            <polygon points="5,50 30,20 55,50" fill="#6B6A6F" />
            <polygon points="35,50 60,15 85,50" fill="#5D5C61" />
            <polygon points="75,50 95,25 115,50" fill="#6B6A6F" />
        </svg>
    );
};

export default Mountains;
