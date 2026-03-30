<template>
  <h3>WebGL</h3>

  <div class="work-area">
    <canvas
        ref="canvas"
        width="1000"
        height="600"
    />

    <div class="params">

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, render } from "vue"


const canvas = ref(null)

onMounted(() => {
  const gl = canvas.value.getContext("webgl2")
  
  if (!gl) console.error("HAVE NO WebGL2 context")

  
})  

</script>

<style scoped>

.work-area {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

canvas {
  border: solid var(--border-color) 2px;
  border-radius: 5px;
}

.params {
  background-color: var(--panels-color);
  width: 100%;
  border-radius: 5px;
}

</style>