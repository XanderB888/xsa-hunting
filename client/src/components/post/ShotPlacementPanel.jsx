function ShotPlacementPanel({ shot }) {
  return (
    <div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img src={shot.image} alt="Shot placement diagram" />
        <div
          style={{
            position: 'absolute',
            left: `${shot.x}%`,
            top: `${shot.y}%`,
            width: '14px',
            height: '14px',
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      <p>Time: {shot.timeOfDay}</p>
      <p>Wind: {shot.wind}</p>
      <p>Weather: {shot.weather}</p>
    </div>
  );
}

export default ShotPlacementPanel;