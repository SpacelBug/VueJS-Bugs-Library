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
            <div class="section-option" @click="currentComponent = 'Switch'">
              Switch
            </div>
          </div>
        </div>
      </div>
      <div class="component-view">
        <div class="component-example">
          <component :is="currentComponent" v-model="testBoolValue"></component>
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
import Switch from './components/inputs/Switch.vue';

export default {
  name: 'App',
  components: {
    Switch,
  },
  data() {
    return {
      currentComponent: null,
      testBoolValue: false,
    }
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