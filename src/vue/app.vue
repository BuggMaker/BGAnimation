<template>
    <Particle :width='width' :height='height' :number='number' :style="style"></Particle>
</template>

<script>
export default {
  data() {
    return {
      width: 600,
      height: 600,
      number: 30,
      style: {
        border: "1px solid lightgray"
      }
    };
  }
};
</script>

<style>

</style>
