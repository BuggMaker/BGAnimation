import React from "react";
import {ParticleAnimation} from "../../../common/index";

export default class Particle extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.animation = new ParticleAnimation({
      canvas: this.oCanvas,
      width: this.props.width,
      height: this.props.height,
      number: this.props.number
    });

    this.animation.init()
  }

  render() {
    return (
      <canvas style={this.props.style} ref={canvas => (this.oCanvas = canvas)}>
        您的浏览器不支持Canvas,请使用其他浏览器试试看!
      </canvas>
    );
  }
}

Particle.defaultProps = {
  width: 1080,
  height: 512,
  number: 50,
  style: {
    border: "1px solid lightgray"
  }
};
