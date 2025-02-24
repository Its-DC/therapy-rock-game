import React, { useState, useEffect } from 'react';

const Sun = () => {
    const [position, setPosition] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition(prev => (prev + 0.5) % 100); // Moves smoothly across the screen
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: `${position}%`,
                left: `${position}%`,
                width: '50px',
                height: '50px',
                backgroundColor: 'yellow',
                borderRadius: '50%',
                zIndex: -2, // ✅ Keeps sun in the background
            }}
        />
    );
};

export default Sun;
