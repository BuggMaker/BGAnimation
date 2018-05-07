import { merage, distance } from "../utils";
import { Extent } from ".";

export function Heatmap(config = HeatmapConfig) {
  merage(this, config);
  this.min = 999;
  this.max = -999;
}
Heatmap.prototype = {
  constructor: Heatmap,
  // 创建热力图
  create() {
    let img = [];
    let heat = 0,
      b2 = Math.pow(this.bandWidth, 2),
      k = 1 / b2 * 3 / 4;
    for (let c = 0; c < this.height; c++) {
      for (let r = 0; r < this.width; r++) {
        heat = 0;
        const includes = this.getIncludes([r, c]);
        if (includes.length > 0) {
          includes.forEach(item => {
            heat += k * (1 - Math.pow(item.dis, 2) / b2);
          });
          this.min > heat && (this.min = heat);
          this.max < heat && (this.max = heat);
        }
        // img.set(r + "_" + c, heat);
        img.push(heat);
      }
    }
    return { img, min: this.min, max: this.max };
  },
  // 获取范围内的点
  getIncludes(center = [0, 0]) {
    let resultAry = [],
      range = new Extent(
        [center[0] - this.bandWidth, center[1] - this.bandWidth],
        [center[0] + this.bandWidth, center[1] + this.bandWidth]
      );

    this.data.forEach(point => {
      const dis = distance(center, [point.x, point.y]);
      if (range.isIn(point.x, point.y) && dis <= this.bandWidth) {
        resultAry.push({ dis, point });
      }
    });
    return resultAry;
  }
};

export const HeatmapConfig = {
  type: "",
  width: 100,
  height: 100,
  bandWidth: 100,
  colorRamp: [0, 360],
  data: []
};
