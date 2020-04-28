import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Navigation = (props, context) => (
  <div className = "navigation">
    <div className="inner">
      <Link to="/">Main Page</Link>
      <Link to="/attendance">Join Game</Link>
    </div>
  </div>
)

export default Navigation;