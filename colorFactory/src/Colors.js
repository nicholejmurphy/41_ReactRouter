import React from "react";
import { Link } from "react-router-dom";
import "./static/Colors.css";

function Colors({ colors }) {
  return (
    <div className="Colors">
      <h1>Welcome to the color factory!</h1>
      <Link className="Colors-link-new" to="/colors/new">
        Add a color
      </Link>
      <h3>Checkout a color from below</h3>
      <div className="Colors-links">
        {colors.map((c) => (
          <Link className="Colors-color" key={c.color} to={`/colors/${c.name}`}>
            {c.name.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Colors;
