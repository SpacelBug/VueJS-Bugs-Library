<template>
  <div id="app">
    <header>
      VueJS Components Library
    </header>

    <div class="main-box">
      <div class="navigation-panel">
        <div class="section">
          <div
              class="section-caption"
              @click="selectedSection = 'InputSection'"
          >
            Inputs
          </div>
          <InputSection v-if="selectedSection === 'InputSection'" />
          <div
              class="section-caption"
              @click="selectedSection = 'ContentSection'"
          >
            Content
          </div>
          <ContentSection v-if="selectedSection === 'ContentSection'" />
          <div
              class="section-caption"
              @click="selectedSection = 'SpecialSection'"
          >
            Special
          </div>
          <SpecialSection v-if="selectedSection === 'SpecialSection'" />
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
import InputSection from './views/sections/InputSection.vue';
import ContentSection from './views/sections/ContentSection.vue';
import SpecialSection from './views/sections/SpecialSection.vue';

export default {
  name: 'App',
  components: {
    InputSection,
    ContentSection,
    SpecialSection,
  },
  data() {
    return {
      selectedSection: 'InputSection'
    }
  }
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
  cursor: pointer;
  user-select: none;
  font-size: var(--big-font-size);
}

.section-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 0 0 16px;
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