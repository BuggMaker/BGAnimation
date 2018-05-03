import IAnimation from "./IAnimation";
import { Extent, Particle } from "../graphic";
import { random, distance } from "../utils";

export default class ParticleAnimation extends IAnimation {
  constructor(props) {
    super(props);
    // 粒子数
    this.number = props.number || 0;
    // 存放粒子的数组
    this.oArray = [];

    // 注意绑定this指向 不然loop中会出错
    this.loop = this.loop.bind(this);
  }
  init() {
    super.inite();
    let oArray = this.oArray;
    for (let i = 0; i < this.number; i++) {
      let oPr = new Particle();
      oPr.range = new Extent([0, 0], [this.width, this.height]);
      oPr.x = random(0, this.width);
      oPr.y = random(0, this.height);
      oPr.radius = random(4, 8);
      oPr.oldRadius = oPr.radius;
      oPr.speed = 2 / oPr.radius;
      oPr.direction = random(0, 2 * Math.PI);
      oArray.push(oPr);
    }

    // 鼠标事件交互
    let mousePc = new Particle();
    // 鼠标移入画布时添加粒子
    this.canvas.onmouseenter = function(e) {
      mousePc.x = e.offsetX;
      mousePc.y = e.offsetY;
      mousePc.radius = 10;
      mousePc.oldRadius = mousePc.radius;
      mousePc.range = new Extent([0, 0], [this.width, this.height]);
      mousePc.speed = 0;
      mousePc.style.fillStyle = "rgba(200,100,100,1)";
      oArray.push(mousePc);
    };
    // 鼠标移出画布时移除粒子
    this.canvas.onmouseleave = function() {
      const index = oArray.indexOf(mousePc);
      if (index >= 0) oArray.splice(index, 1);
    };
    // 鼠标移动时更改粒子位置
    this.canvas.onmousemove = function(e) {
      mousePc.x = e.offsetX;
      mousePc.y = e.offsetY;
    };

    this.loop();
  }
  loop() {
    super.loop();
    this.step();
    requestAnimationFrame(this.loop);
  }
  step() {
    super.step();
    const ctx = this.ctx;
    this.oArray.forEach(pc1 => {
      pc1.step();
      // 判断势力范围
      let partners = 0;
      this.oArray.forEach(partner => {
        if (pc1 != partner) {
          if (distance([pc1.x, pc1.y], [partner.x, partner.y]) <= pc1.bossbom) {
            // 绘制连接线
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = "rgba(200,200,200,0.5)";
            ctx.moveTo(pc1.x, pc1.y);
            ctx.lineTo(partner.x, partner.y);
            ctx.stroke();
            ctx.restore();
            partners += 1;
          }
        }
      });
      // pc1.radius = pc1.oldRadius + partners;
    });
    this.oArray.forEach(pc => {
      // 绘制粒子
      pc.draw(ctx);
    });
  }
}
