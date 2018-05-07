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

<style>

</style>
