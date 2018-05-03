import React from "react";
import ReactDOM from "react-dom";

import * as Coms from "./components/index";

const mountDom = document.getElementById("root");
ReactDOM.render(
  <Coms.Particle width="600" height="600" number={50} />,
  mountDom
);
