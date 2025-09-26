<template>
  <div id="app">
    <header>
      VueJS Components Library
    </header>

    <div class="main-box">
      <div class="navigation-panel">

      </div>
      <div class="component-view">
        <div class="component-example">

        </div>
        <div class="component-description">
          
        </div>
      </div>
    </div>

    <footer>

    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() { return {

  }},
}

</script>
<style scoped>
header {
  height: fit-content;
  width: 100%;
  padding: 16px 32px;
  background-color: var(--panels-color);
  border: solid var(--border-color);
  border-width: 0 0 1px 0;
  box-sizing: border-box;
}

.main-box {
  display: flex;
  flex-direction: row;
  background-color: var(--background-color);
  height: 100vh;
  box-sizing: border-box;
}

.navigation-panel {
  background-color: var(--panels-color);
  border: solid var(--border-color);
  border-width: 0 1px 0 0;
  width: 300px;
}

footer {
  height: 100px;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--panels-color);
}
</style>