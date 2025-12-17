<template>
  <div class="fun-examples">
    <div class="main-box">
      <h3>Stars background</h3>
      <div class="wrapper">
        <stars-background></stars-background>
      </div>
    </div>
    <div class="main-box">
      <h3>Stars background</h3>
      <div class="wrapper">
        <stars-background :sparkle="true" :speed="0.2"></stars-background>
      </div>
    </div>
  </div>
</template>

<script>
import StarsBackground from './StarsBackground.vue';

export default {
  name: 'FunView',
  components: {
    StarsBackground,
  },
};

</script>

<style scoped>
.fun-examples {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;
  padding: 16px;
}

.main-box {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  position: relative;
  background-color: var(--panels-color);
  padding: 16px;
  gap: 8px;
  border-radius: 5px;
}

.wrapper {
  box-sizing: border-box;
}
</style>