import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShotPlacementSelector from './ShotPlacementSelector.jsx';
import api from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext.jsx';
import './CreatePost.css';

function CreatePostForm() {
  const [form, setForm] = useState({
    photo: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        photo: form.photo || 'https://placehold.co/600x400',
        caption: form.caption,
        location: form.location,
        species: form.species,
        sex: form.sex,
        distance: form.distance ? Number(form.distance) : null,
        shot_image: shotData ? shotData.image : null,
        shot_x: shotData ? shotData.x : null,
        shot_y: shotData ? shotData.y : null,
        time_of_day: form.timeOfDay,
        wind: form.wind,
        weather: form.weather,
        firearm_brand: form.firearmBrand,
        caliber: form.caliber,
        ammo: form.ammo,
        grain: form.grain ? Number(form.grain) : null,
      };

      const res = await api.post('/posts', newPost);
      navigate(`/posts/${res.data.id}`);   // go to the new post
    } catch (err) {
      console.error(err);
      alert('Failed to create post');
    }
  };

  const openUploadWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'zrghysak',
        uploadPreset: 'xsa-hunting',
        sources: ['local', 'url', 'camera'],   // where users can pick from
        multiple: false,                         // one image per post
        resourceType: 'image',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          // the uploaded image's URL:
          setForm((prev) => ({ ...prev, photo: result.info.secure_url }));
        }
      }
    );
    widget.open();
  };

  return (
    <div className="create-post">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit} className="create-post-form">

        <div className="form-section">
          <div className="form-section-title">Photo</div>
          <button type="button" onClick={openUploadWidget} className="upload-button">
            Upload Image
          </button>
          {form.photo && <img src={form.photo} alt="preview" className="upload-preview" />}
        </div>

        <div className="form-section">
          <div className="form-section-title">The Hunt</div>
          <input name="caption" placeholder="Caption" value={form.caption} onChange={handleChange} />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
          <input name="species" placeholder="Species" value={form.species} onChange={handleChange} />
          <input name="sex" placeholder="Sex (e.g. Ram, Bull)" value={form.sex} onChange={handleChange} />
          <input name="distance" type="number" placeholder="Shot distance (m)" value={form.distance} onChange={handleChange} />
        </div>

        <div className="form-section">
          <div className="form-section-title">Firearm</div>
          <input name="firearmBrand" placeholder="Firearm brand" value={form.firearmBrand} onChange={handleChange} />
          <input name="caliber" placeholder="Caliber" value={form.caliber} onChange={handleChange} />
          <input name="ammo" placeholder="Ammo type" value={form.ammo} onChange={handleChange} />
          <input name="grain" type="number" placeholder="Grain" value={form.grain} onChange={handleChange} />
        </div>

        <div className="form-section">
          <div className="form-section-title">Conditions</div>
          <input name="timeOfDay" placeholder="Time of hunt" value={form.timeOfDay} onChange={handleChange} />
          <input name="wind" placeholder="Wind conditions" value={form.wind} onChange={handleChange} />
          <input name="weather" placeholder="Weather conditions" value={form.weather} onChange={handleChange} />
        </div>

        <div className="form-section">
          <div className="form-section-title">Shot Placement</div>
          <ShotPlacementSelector onShotChange={setShotData} />
        </div>

        <button type="submit" className="submit-button">Submit Post</button>
      </form>
    </div>
  );
}

export default CreatePostForm;