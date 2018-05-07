## 动效组件
一套可复用的基于React和Vue开发的动效组件.
----
在网页中经常会见到效果酷炫的动态效果，如下图：
![](https://upload-images.jianshu.io/upload_images/7859404-0f4b728b361448e4.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)
网上也有比较多的教程，但是学习的最终成果，往往是各个独立的html文件，很难复用在其他项目中。
----
而如今，前端开发讲究模块化以及组件化，所以便想通过一定方式将其封装为模块或者组件，方便在其他项目中调用。考虑到如今比较流行React与Vue组件开发， 所以本文主要分享如何将之前的动效以模块和React及Vue组件的形式实现。

效果放前面:
![‘粒子-线’组件化.gif](https://upload-images.jianshu.io/upload_images/7859404-e979133928d2b9ac.gif?imageMogr2/auto-orient/strip)

![热力图.gif](https://upload-images.jianshu.io/upload_images/7859404-455d9cf2a1164b79.gif?imageMogr2/auto-orient/strip)

![鼠标移动--气泡.gif](https://upload-images.jianshu.io/upload_images/7859404-0edd66210ef1f677.gif?imageMogr2/auto-orient/strip)

使用很是简单，具体如下：
- index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1920, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React BGAnimation</title>
    <link rel='stylesheet' href='./index.css'></link>
</head>
<body>
    <div id="container" class="txt-center">
        <div class="left">
            <header>
                <h3>React组件</h3>
            </header>
            <main id="root" class="content"> </main>
        </div>
        <div class="right">
            <header>
                <h3>Vue组件</h3>
            </header>
            <main id="app" class="content">
                <app></app>
            </main>
        </div>
    </div>
    <script src='./dist/react.build.js'></script>
    <script src='./dist/vue.build.js'></script>
</body>
</html>
```
- Vue使用方法
```
<template>
    <MouseMovingBubble :width='width' :height='height' :number='number' :style="style"></MouseMovingBubble>
</template>
<script>
export default {
  data() {
    return {
      width: 600,
      height: 500,
      number: 10,
      style: {
        border: "1px solid lightgray"
      }
    };
  }
};
</script>
```
- React使用方法
```
import React from "react";
import ReactDOM from "react-dom";
import * as Coms from "./components/index";
const mountDom = document.getElementById("root");
ReactDOM.render(
  <Coms.MouseMovingBubble width="600" height="500" number={10} />,
  mountDom
);
```

## 动画
我们都知道,动画只不过是一个短时间内连续绘制不同图形(帧)产生的效果.通过`requestAnimationFrame`可以实现流畅的动画,因为浏览器内部对动画执行做了优化(与浏览器渲染同步);不建议使用`setTimeInterval`,因为这是个[不靠谱](https://mp.weixin.qq.com/s/FCy68lhFhEcm8o26f7970A)的家伙!

那么下边介绍一下我自己理解的一个动画的基本框架:
- 初始化(Init):完成一些数据的预处理和画布画笔的创建等
- 步进(Step):完成每一帧动画图形变化需要做的操作(如清空画布/计算新的位置等)
- 循环(Loop):完成动画的循环,即循环执行步进(Step)方法

是不是很简单呢?哈哈 下边动手实现以下:

#### 所有动画父类:IAniamtion
通过分析完成一个动画效果的过程,我们可以抽象出一个基类(IAnimation),定义所有动画必须实现的方法以及对一下公共操作进行封装.
```
export default class IAnimation {
  constructor(props) {
    // 接收配置参数
    this.canvas = props.canvas;
    this.width = parseInt(props.width);
    this.height = parseInt(props.height);
    // 为方法绑定this
    this.init = this.init.bind(this);
    this.step = this.step.bind(this);
    this.loop = this.loop.bind(this);
  }
  init() {
    // 初始化画布和画笔
    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx) throw "浏览器不支持Canvas,请使用其他浏览器试试!";
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
  loop() {
    // 每次loop前清空之前画布的内容
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  step() {
    // 步进
  }
}
```
#### "鼠标移动--气泡"动画实现
以"鼠标气泡"为例,简单说明实现动画的过程.因为逻辑不复杂,所以实现也比较简单.
```
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
```
#### React与Vue组件封装
其实在动画逻辑实现好了的情况下,封装组件是一件异常简单的事情(暂时不考虑复杂的逻辑或者交互),只需要在组件特定的**生命周期**执行动画实例的相应发方法即可.这里以为需要传入`canvas DOM`作为动画参数,所以在组件挂载之后创建了动画实例,并执行了初始化方法.

具体以"鼠标移动--气泡"动画为例说明React和Vue封装:
- `MouseMovingBubble.jsx`
```
import React from "react";
import { MouseMovingBubbleAnimation } from "../../../common/index";

export default class Particle extends React.Component {
  constructor(props) {
    super(props);
  }

  // 挂载后创建动画实例
  componentDidMount() {
    this.animation = new MouseMovingBubbleAnimation ({
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
```
- `MouseMovingBubble.vue`
```
<template>
    <canvas :width="width" :height="height">您的浏览器不支持Canvas,请使用其他浏览器试试看!</canvas>
</template>

<script>
import { MouseMovingBubbleAnimation } from "../../../common/animation/index";
export default {
  // 默认参数配置
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    number: {
      type: Number,
      default: 30
    }
  },
  mounted() {
    // 组件挂载后创建动画实例
    const animation = new MouseMovingBubbleAnimation ({
      width: this.width,
      height: this.height,
      number: this.number,
      canvas: this.$el
    });
    // 初始化动画
    animation.init();
  }
};
</script>

<style>
</style>

```

其他的效果实现,暂时不在这里抛代码了,感兴趣的可以去看[源码](https://github.com/BuggMaker/BGAnimation),后面也会针对个别效果做详细介绍...

----
**如果您感觉有所帮助，或者有问题需要交流，欢迎留言评论，非常感谢！**
**前端菜鸟，还请多多关照！**

- Git： [BuggMaker](https://github.com/BuggMaker)
- 博客：[倒霉蛋儿_才才](https://www.jianshu.com/u/4c79df8e2b03)
----
