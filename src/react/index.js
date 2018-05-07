import React from "react";
import ReactDOM from "react-dom";

import * as Coms from "./components/index";

const mountDom = document.getElementById("root");
ReactDOM.render(
  <Coms.MouseMovingBubble width="600" height="500" number={10} />,
  mountDom
);
