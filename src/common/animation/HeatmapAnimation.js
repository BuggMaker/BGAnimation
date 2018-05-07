import IAnimation from "./IAnimation";
import { Extent, Particle, Heatmap } from "../graphic";
import { random, distance } from "../utils";

export default class HeatmapAnimation extends IAnimation {
  constructor(props) {
    super(props);
    // 粒子数
    this.number = props.number || 0;
    // 存放粒子的数组
    this.oArray = [];

    // 注意绑定this指向 不然loop中会出错
    this.loop = this.loop.bind(this);
    this.step = this.step.bind(this);
  }
  init() {
    super.init();
    let oArray = this.oArray;
    for (let i = 0; i < this.number; i++) {
      let oPr = new Particle();
      oPr.range = new Extent([0, 0], [this.width, this.height]);
      oPr.x = random(0, this.width);
      oPr.y = random(0, this.height);
      oPr.radius = 4;
      oPr.oldRadius = oPr.radius;
      oPr.speed = oPr.radius;
      oPr.direction = random(0, 2 * Math.PI);
      oArray.push(oPr);
    }
    // this.loop();

    setInterval(this.step, 3000);
  }
  loop() {
    super.loop();
    this.step();
    requestAnimationFrame(this.loop);
  }
  step() {
    super.step();
    const ctx = this.ctx;
    this.oArray.forEach(pc => {
      // 绘制粒子
      pc.step();
      // pc.draw(ctx);
    });
    this.calculateHeat();
    this.oArray.forEach(pc => {
      // 绘制粒子
      // pc.step();
      pc.draw(ctx);
    });
  }

  calculateHeat() {
    const heatmap = new Heatmap({
      width: this.width,
      height: this.height,
      bandWidth: 80,
      data: this.oArray
    });
    let mapData = heatmap.create();
    let img = this.ctx.getImageData(0, 0, this.width, this.height);

    for (let index = 0; index < mapData.img.length; index++) {
      const val = Math.floor(
        mapData.img[index] / (mapData.max - mapData.min) * 100
      );
      let r = 0,
        g = 0,
        b = 0;

      if (val < 25) {
        b = 255;
        g = val * 10;
      } else if (val >= 25 && val < 50) {
        b = 255 - (val - 25) * 10;
        g = 255;
      } else if (val >= 50 && val < 75) {
        g = 255;
        r = (val - 50) * 10;
      } else if (val >= 75 && val <= 100) {
        g = 255 - (val - 75) * 10;
        r = 255;
      }
      let i = index * 4;
      img.data[i] = r;
      img.data[i + 1] = g;
      img.data[i + 2] = b;
      img.data[i + 3] = 255;
    }
    this.ctx.putImageData(img, 0, 0);
  }
}
