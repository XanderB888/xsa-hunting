import { useState } from "react";
import { SHOT_IMAGES } from "../../gallery/gallery.js";

function ShotPlacementSelector() {
  const [species, setSpecies] = useState('');
  const [view, setView] = useState('');

  const currentImage =
    species && view && SHOT_IMAGES[species]
      ? SHOT_IMAGES[species][view]
      : null;

  return (
    <div>
      <h3>Shot Placement</h3>

      <select value={species} onChange={(e) => setSpecies(e.target.value)}>
        <option value="">Select species</option>
        <option value="Impala">Impala</option>
        <option value="Kudu">Kudu</option>
      </select>

      <select value={view} onChange={(e) => setView(e.target.value)}>
        <option value="">Select view</option>
        <option value="Side L">Side L</option>
        <option value="Side R">Side R</option>
        <option value="Front">Front</option>
      </select>

      {currentImage && (
        <div>
          <img src={currentImage} alt={`${species} ${view}`} />
        </div>
      )}
    </div>
  );
}

export default ShotPlacementSelector;