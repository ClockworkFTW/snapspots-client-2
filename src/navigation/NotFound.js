import React from "react";
import { Link } from "react-router-dom";

import { ROOT } from "./CONSTANTS";

export const NotFound = () => (
  <div>
    <h1>Page Not Found!</h1>
    <Link to={ROOT}>Return Home</Link>
  </div>
);
