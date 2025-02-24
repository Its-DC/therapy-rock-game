import React from 'react';

const Grass = () => {
    return (
        <div style={styles.grass} />
    );
};

const styles = {
    grass: {
        position: 'absolute',
        width: '100vw',  // ✅ Ensures it covers the full width of the screen
        height: '50vh',  // ✅ Covers the lower 50% of the screen
        bottom: 0,       // ✅ Sticks to the bottom
        backgroundColor: '#228B22', // ✅ Green grass color
        zIndex: 0,      // ✅ Ensures it's behind trees but above the river & mountains
    },
};

export default Grass;
