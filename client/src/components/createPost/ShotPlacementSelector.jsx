import { useState } from "react";
import { SHOT_IMAGES } from "../../gallery/gallery.js";

function ShotPlacementSelector({ onShotChange }) {
  const [species, setSpecies] = useState('');
  const [view, setView] = useState('');
  const [dot, setDot] = useState(null);  

  const currentImage =
    species && view && SHOT_IMAGES[species]
      ? SHOT_IMAGES[species][view]
      : null;

  const handleImageClick = (e) => {          
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setDot({ x, y });
    onShotChange({ species, view, x, y, image: currentImage }); //Reports up to the parent
  };

  return (
    <div>
      <h3>Shot Placement</h3>

      <select value={species} onChange={(e) => { setSpecies(e.target.value); setDot(null); }}>
        <option value="">Select species</option>
        {Object.keys(SHOT_IMAGES).map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>

      <select value={view} onChange={(e) => { setView(e.target.value); setDot(null); }} disabled={!species}>
        <option value="">Select view</option>
        {species && SHOT_IMAGES[species] &&
         Object.keys(SHOT_IMAGES[species]).map((v) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      {currentImage && (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={currentImage}
        alt={`${species} ${view}`}
        onClick={handleImageClick}
        style={{ 
          cursor: 'crosshair',
          width: '500px',
          height: '367px',
          objectFit: 'contain', 
        }}
      />
      {dot && (
        <div
          style={{
            position: 'absolute',
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: '10px',
            height: '10px',
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )}
    </div>
  );
}

export default ShotPlacementSelector;