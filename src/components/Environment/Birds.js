import React, { useEffect, useState } from 'react';

const generateBirds = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 50,
        speed: Math.random() * 3 + 1, // Different speeds for birds
    }));
};

const Birds = () => {
    const [birds, setBirds] = useState(generateBirds(5));

    useEffect(() => {
        const interval = setInterval(() => {
            setBirds(prevBirds =>
                prevBirds.map(bird => ({
                    ...bird,
                    x: (bird.x + bird.speed) % 110, // Loops when reaching the end
                }))
            );
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'absolute', top: '10%', left: '0%', width: '100%', zIndex: 2 }}>
            {birds.map(bird => (
                <div
                    key={bird.id}
                    style={{
                        position: 'absolute',
                        left: `${bird.x}%`,
                        top: `${bird.y}%`,
                        width: '20px',
                        height: '10px',
                        backgroundColor: 'black',
                        borderRadius: '50%',
                    }}
                />
            ))}
        </div>
    );
};

export default Birds;
