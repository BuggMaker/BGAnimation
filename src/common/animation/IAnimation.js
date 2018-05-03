export default class IAnimation {
  constructor(props) {
    this.canvas = props.canvas;
    this.width = parseInt(props.width);
    this.height = parseInt(props.height);

    this.clear = this.clear.bind(this);
  }
  inite() {
    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx) throw "浏览器不支持Canvas,请使用其他浏览器试试!";
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
  loop() {
    this.clear();
  }
  step() {}
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
