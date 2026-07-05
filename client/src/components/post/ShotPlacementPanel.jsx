function ShotPlacementPanel({ shot }) {
  return (
    <div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img src={shot.shot_image} alt="Shot placement diagram" />
        <div
          style={{
            position: 'absolute',
            left: `${shot.shot_x}%`,
            top: `${shot.shot_y}%`,
            width: '14px',
            height: '14px',
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      <p>Time: {shot.time_of_day}</p>
      <p>Wind: {shot.wind}</p>
      <p>Weather: {shot.weather}</p>
    </div>
  );
}

export default ShotPlacementPanel;