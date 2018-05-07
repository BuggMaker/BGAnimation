import IAnimation from "./IAnimation";
import { Extent, Particle } from "../graphic";
import { random } from "../utils";

export default class MouseMovingBubbleAnimation extends IAnimation {
  constructor(props) {
    super(props);
    // 每次鼠标移动产生的粒子数
    this.number = props.number || 0;
    this.oArray = [];
  }
  init() {
    // 调用父类(IAnimation)的init方法
    super.init();
    var self = this;
    // 监视鼠标移动事件
    this.canvas.onmousemove = function(e) {
      const mpos = { x: e.offsetX, y: e.offsetY };
      for (let i = 0; i < self.number; i++) {
        // 创建粒子
        let oPr = new Particle();
        oPr.range = new Extent([0, 0], [self.width, self.height]);
        oPr.x = mpos.x;
        oPr.y = mpos.y;
        oPr.radius = random(8, 15);
        oPr.speed = 20 / oPr.radius;
        oPr.direction = random(0, 2 * Math.PI);
        self.oArray.push(oPr);
      }
    };
    // 执行动画
    self.loop();
  }
  loop() {
    // 判断粒子数
    // 当例子说大于0的时候执行步进操作
    if (this.oArray.length > 0) {
      super.loop();
      this.step();
    }
    requestAnimationFrame(this.loop);
  }
  step() {
    // 调用父类步进(step)方法
    super.step();
    let deletAry = [];
    this.oArray.forEach(p => {
      // 粒子步进
      p.step();
      // 减小粒子半径
      p.radius -= p.oldRadius / 50;
      // 直到小于0 消失
      if (p.radius <= 0) deletAry.push(p);
      else p.draw(this.ctx);
    });

    // 移除消失的粒子
    deletAry.forEach(p => {
      let index = this.oArray.indexOf(p);
      this.oArray.splice(index, 1);
    });
  }
}
