import { PI, PI_2, distance, merage, defProp, random } from "../utils";
import { Extent } from ".";

/**
 * 粒子类
 */
export default function Particle() {
  this.x = 0;
  this.y = 0;
  this.oldRadius = 0;
  this.style = {
    lineWidth: 1,
    fillStyle: `hsla(${random(0, 360)},60%,50%,0.8)`
  };
  this.range = new Extent();
  this.vx = 1;
  this.vy = 1;
  this.visable = true;

  // 柯理化
  this.defProp = defProp(this);
  // 半径
  this.defProp("radius", 5, {
    setter: nVal => {
      if (this.oldRadius === 0) this.oldRadius = nVal;
    }
  });
  // 方向
  this.defProp("direction", 0, {
    setter: nVal => {
      this.vx = this.speed * Math.cos(nVal);
      this.vy = this.speed * Math.sin(nVal);
    }
  });
  // 速度
  this.defProp("speed", 1, {
    setter: nVal => {
      this.vx = nVal * Math.cos(this.direction);
      this.vy = nVal * Math.sin(this.direction);
    }
  });
  // 势力范围
  // 与半径成正比
  this.defProp("bossbom", 50, {
    gettter: value => {
      // return value;
      return this.radius * 10;
    }
  });

  function _calSpeed() {}
}

/**
 * 移动
 */
Particle.prototype.step = function() {
  if (!this.range.isIn(this.x, this.y)) {
    switch (this.range.craash(this.x, this.y)) {
      case 1:
      case 3:
        this.vy *= -1;
        break;
      case 2:
      case 4:
        this.vx *= -1;
    }
  }
  this.x += this.vx;
  this.y += this.vy;
};

Particle.prototype.draw = function(ctx) {
  ctx.save();
  ctx.beginPath();
  merage(ctx, this.style);
  ctx.arc(this.x, this.y, this.radius, 0, PI * 2, false);
  ctx.fill();
  ctx.restore();
};
