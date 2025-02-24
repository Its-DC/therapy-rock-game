import React, { useState } from 'react';

const VolumeButton = ({ volume, setVolume }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMute = () => {
        setVolume(volume > 0 ? 0 : 1);
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (event) => {
        setVolume(parseFloat(event.target.value));
    };

    return (
        <div style={styles.container}>
            <button onClick={toggleOpen} style={styles.button}>
                🎵
            </button>
            {isOpen && (
                <div style={styles.sliderContainer}>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleChange}
                        style={styles.slider}
                    />
                    <button onClick={toggleMute} style={styles.muteButton}>
                        {volume > 0 ? '🔊' : '🔇'}
                    </button>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        top: '65px', // ✅ Moves it directly under the menu
        right: '10px', // ✅ Keeps it aligned with the right side
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        zIndex: 10,
    },
    button: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: 'white',
    },
    sliderContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '5px 10px',
        borderRadius: '8px',
        marginTop: '5px',
        position: 'absolute',
        right: '40px', // ✅ Opens the slider to the left of the button
        top: '0',
    },
    slider: {
        width: '100px',
        cursor: 'pointer',
    },
    muteButton: {
        background: 'none',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        color: 'white',
    },
};

export default VolumeButton;
