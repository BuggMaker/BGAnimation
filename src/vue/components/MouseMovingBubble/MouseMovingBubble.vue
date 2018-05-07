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
    const animation = new MouseMovingBubbleAnimation({
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
