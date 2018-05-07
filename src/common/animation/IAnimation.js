export default class IAnimation {
  constructor(props) {
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
