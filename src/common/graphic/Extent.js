/**
 * 范围
 */
export default function Extent(from = [0, 0], to = [100, 100]) {
  this.minX = Math.min(from[0], to[0]);
  this.minY = Math.min(from[1], to[1]);
  this.maxX = Math.max(from[0], to[0]);
  this.maxY = Math.max(from[1], to[1]);
}
// 是否在范围内
Extent.prototype.isIn = function(x, y) {
  return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
};
// 判断与那个边界发生碰撞
// 上右下左 -> 1 2 3 4
Extent.prototype.craash = function(x, y) {
  if (x <= this.minX) {
    return 4;
  } else if (x >= this.maxX) {
    return 2;
  } else if (y >= this.maxY) {
    return 3;
  } else if (y <= this.minY) {
    return 1;
  }
};

