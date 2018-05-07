<template>
    <canvas :width="width" :height="height">您的浏览器不支持Canvas,请使用其他浏览器试试看!</canvas>
</template>

<script>
import { HeatmapAnimation } from "../../../common/animation/index";
export default {
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
    const animation = new HeatmapAnimation({
      width: this.width,
      height: this.height,
      number: this.number,
      canvas: this.$el
    });
    animation.init();
  }
};
</script>

<style>

</style>
