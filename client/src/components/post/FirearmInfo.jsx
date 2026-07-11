function FirearmInfo({ firearm }) {
  return (
    <div>
      <h3 className="section-heading">Firearm</h3>
      <p>Brand: {firearm.firearm_brand}</p>
      <p>Caliber: {firearm.caliber}</p>
      <p>Ammo: {firearm.ammo}</p>
      <p>Grain: {firearm.grain}gr</p>
    </div>
  );
}

export default FirearmInfo;