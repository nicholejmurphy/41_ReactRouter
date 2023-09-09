import React from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import "./static/Color.css";

function Color({ colors }) {
  const { name } = useParams();
  const color = colors.filter((c) => c.name === name)[0];
  if (!color) {
    return <Redirect to="/colors" />;
  }
  return (
    <div className="Color">
      <h1 style={{ color: color.color }}>{color.name.toUpperCase()}</h1>
      <Link to="/colors">Go Back</Link>
    </div>
  );
}

export default Color;
