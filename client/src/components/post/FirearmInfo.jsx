function FirearmInfo({ firearm }) {
  return (
    <div>
      <h3>Firearm</h3>
      <p>Brand: {firearm.brand}</p>
      <p>Caliber: {firearm.caliber}</p>
      <p>Ammo: {firearm.ammo}</p>
      <p>Grain: {firearm.grain}gr</p>
    </div>
  );
}

export default FirearmInfo;