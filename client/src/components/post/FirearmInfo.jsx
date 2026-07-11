function FirearmInfo({ firearm }) {
  return (
    <div>
      <h3 className="section-heading">Firearm</h3>
        <div className="firearm-bubble">
          <p><strong>Brand:</strong> {firearm.firearm_brand}</p>
          <p><strong>Caliber:</strong> {firearm.caliber}</p>
          <p><strong>Ammo:</strong> {firearm.ammo}</p>
          <p><strong>Grain:</strong> {firearm.grain}gr</p>
        </div>
    </div>
  );
}

export default FirearmInfo;