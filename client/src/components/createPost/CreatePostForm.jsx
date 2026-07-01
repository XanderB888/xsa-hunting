import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShotPlacementSelector from './ShotPlacementSelector.jsx';

function CreatePostForm() {
  const [form, setForm] = useState({
    caption: '', location: '', species: '', sex: '', distance: '',
    firearmBrand: '', caliber: '', ammo: '', grain: '',
    timeOfDay: '', wind: '', weather: '',
  });

  const [shotData, setShotData] = useState(null);//Holds shot data

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form fields:', form);
    console.log('Shot data:', shotData);
  };

  return (
    <div>
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <input name="caption" placeholder="Caption" value={form.caption} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="species" placeholder="Species" value={form.species} onChange={handleChange} />
        <input name="sex" placeholder="Sex (e.g. Ram, Bull)" value={form.sex} onChange={handleChange} />
        <input name="distance" type="number" placeholder="Shot distance (m)" value={form.distance} onChange={handleChange} />

        <input name="firearmBrand" placeholder="Firearm brand" value={form.firearmBrand} onChange={handleChange} />
        <input name="caliber" placeholder="Caliber" value={form.caliber} onChange={handleChange} />
        <input name="ammo" placeholder="Ammo type" value={form.ammo} onChange={handleChange} />
        <input name="grain" type="number" placeholder="Grain" value={form.grain} onChange={handleChange} />

        <input name="timeOfDay" placeholder="Time of hunt" value={form.timeOfDay} onChange={handleChange} />
        <input name="wind" placeholder="Wind conditions" value={form.wind} onChange={handleChange} />
        <input name="weather" placeholder="Weather conditions" value={form.weather} onChange={handleChange} />

        <ShotPlacementSelector onShotChange={setShotData} />

        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}

export default CreatePostForm;