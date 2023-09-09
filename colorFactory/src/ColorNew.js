import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./static/ColorNew.css";

function ColorNew({ setColors }) {
  const INITAIL_DATA = { name: "", color: "#0a0a0a" };
  const [formData, setFormData] = useState(INITAIL_DATA);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setColors((colors) => [...colors, formData]);
    history.push("/colors");
  };

  return (
    <div className="Color">
      <h2>Create your own Color!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Choose a name for your color"
          onChange={handleChange}
          value={formData.name}
        ></input>
        <label htmlFor="color">Pick a color</label>
        <input
          type="color"
          id="color"
          name="color"
          onChange={handleChange}
          value={formData.color}
        ></input>

        <button>Add</button>
      </form>
      <Link to="/colors">Go Back</Link>
    </div>
  );
}

export default ColorNew;
