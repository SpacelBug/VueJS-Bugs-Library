<template>
  <h3>WebGL</h3>

  <canvas ref="canvas" width="1000" height="600"/>
</template>

<script>
import { onMounted, ref, useTemplateRef } from "vue"

const canvas = useTemplateRef("canvas")
const ctx = canvas.value?.getContext("webgl")
</script>

<style>
canvas {
  border: solid var(--border-color) 2px;
  border-radius: 5px;
}
</style>