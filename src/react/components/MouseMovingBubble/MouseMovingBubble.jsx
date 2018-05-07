import React from "react";
import { MouseMovingBubbleAnimation } from "../../../common/index";

export default class Particle extends React.Component {
  constructor(props) {
    super(props);
  }

  // 挂载后创建动画实例
  componentDidMount() {
    this.animation = new MouseMovingBubbleAnimation({
      canvas: this.oCanvas,
      width: this.props.width,
      height: this.props.height,
      number: this.props.number
    });
    // 执行初始化方法
    this.animation.init();
  }

  render() {
    return (
      <canvas style={this.props.style} ref={canvas => (this.oCanvas = canvas)}>
        您的浏览器不支持Canvas,请使用其他浏览器试试看!
      </canvas>
    );
  }
}

// 默认配置参数
Particle.defaultProps = {
  width: 1080,
  height: 512,
  number: 10,
  style: {
    border: "1px solid lightgray"
  }
};
