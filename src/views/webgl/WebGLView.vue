<template>
  <h3>WebGL</h3>

  <canvas ref="canvas" width="1000" height="600"/>
</template>

<script setup>
import { onMounted, ref, render } from "vue"


const canvas = ref(null)

onMounted(() => {
  const gl = canvas.value.getContext("webgl")
  /** Render 3d objects (models) in webgl
   * real 3D objects
  */
  function render(modelPath) {
    // Load the model from the specified path
    let path

    // Set up WebGL context and shaders
    // const shaderProgram = initShaders(gl)

    // Render loop
    function renderLoop() {
      // Clear the canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      // Draw the model using the shader program
      // drawModel(gl, shaderProgram, model)

      // Request the next frame
      requestAnimationFrame(renderLoop)
    }

    // Start the render loop
    renderLoop()
  }

  render('./sphere.obj')
})  

</script>

<style scoped>
canvas {
  border: solid var(--border-color) 2px;
  border-radius: 5px;
}
</style>