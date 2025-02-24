import React, { useState, useEffect, useRef } from 'react';
import clickSoundSrc from '../../assets/audio/click.mp3';

// Generate random size and rotation for procedural variation
const getRandomStyle = () => ({
    width: `${Math.random() * 40 + 80}px`, // Between 80-120px
    height: `${Math.random() * 40 + 80}px`,
    transform: `rotate(${Math.random() * 20 - 10}deg)`, // Slight tilt (-10 to 10 degrees)
});

const Rock = ({ onClick, volume }) => {
    const [clicked, setClicked] = useState(false);
    const [rockStyle] = useState(getRandomStyle()); // Set once when the game loads
    const audioRef = useRef(null); // ✅ Persistent audio instance

    useEffect(() => {
        audioRef.current = new Audio(clickSoundSrc);
        audioRef.current.volume = Math.max(0, Math.min(volume, 1)); // ✅ Ensures the correct volume is applied
        console.log("🔊 Audio object created with volume:", audioRef.current.volume);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = Math.max(0, Math.min(volume, 1)); // ✅ Updates volume whenever it changes
            console.log("🔊 Updated volume in Rock.js:", audioRef.current.volume);
        }
    }, [volume]);

    const handleClick = () => {
        setClicked(true);

        if (audioRef.current) {
            audioRef.current.currentTime = 0; // ✅ Reset sound for rapid clicking
            audioRef.current.play(); // ✅ Play the preloaded sound
            console.log("🎵 Playing sound with volume:", audioRef.current.volume); // ✅ Final debug
        }

        setTimeout(() => setClicked(false), 300);
        if (onClick) onClick();
    };

    return (
        <div style={styles.container}>
            <div
                className={`clickable-rock ${clicked ? 'clicked' : ''}`}
                onClick={handleClick}
                style={{ ...styles.rock, ...rockStyle }}
            />
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute', // or fixed
        bottom: '430px',       // a fixed distance from the bottom
        left: '50%',
        transform: 'translateX(-50%)',
    },
    rock: {
        background: 'gray',
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        cursor: 'pointer',
    },
};

export default Rock;