<template>
  <div id="app">
    <header>
      VueJS Components Library
    </header>

    <div class="main-box">
      <div class="navigation-panel">
        <div class="section">
          <div class="section-caption">
            Inputs
          </div>

          <div class="section-options">
            <router-link
                to="switch"
                class="side-link"
            >
              Switch
            </router-link>
          </div>
        </div>
      </div>
      <div class="component-view">
        <router-view></router-view>
      </div>
    </div>

    <footer>

    </footer>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
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
  padding: 16px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-caption {
  font-size: var(--big-font-size);
}

.section-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 0 0 16px;
}

.section-option {
  user-select: none;
  cursor: pointer;
}

.side-link {
  color: white;
  text-decoration: none;
}

.router-link-active {
  color: var(--accent-color)
}

.component-view {
  padding: 64px;
}

footer {
  height: 100px;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--panels-color);
}
</style>