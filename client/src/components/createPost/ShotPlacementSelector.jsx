import { useState } from "react";
import { SHOT_IMAGES } from "../../gallery/gallery.js";

function ShotPlacementSelector() {
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
  };

  return (
    <div>
      <h3>Shot Placement</h3>

      <select value={species} onChange={(e) => { setSpecies(e.target.value); setDot(null); }}>
        <option value="">Select species</option>
        <option value="Impala">Impala</option>
        <option value="Kudu">Kudu</option>
      </select>

      <select value={view} onChange={(e) => { setView(e.target.value); setDot(null); }}>
        <option value="">Select view</option>
        <option value="Side L">Side L</option>
        <option value="Side R">Side R</option>
        <option value="Front">Front</option>
      </select>

      {currentImage && (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={currentImage}
        alt={`${species} ${view}`}
        onClick={handleImageClick}
        style={{ cursor: 'crosshair' }}
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