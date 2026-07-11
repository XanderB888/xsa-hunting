function ShotPlacementPanel({ shot }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <img
        src={shot.shot_image}
        alt="Shot placement diagram"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
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
  );
}

export default ShotPlacementPanel;