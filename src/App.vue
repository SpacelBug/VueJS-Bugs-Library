<template>
  <div id="app">
    <header>
      VueJS Components Library
    </header>

    <div class="main-box">
      <div class="navigation-panel">
        <h3>Components</h3>
        <div class="section">
          <div
              class="section-caption"
              @click="selectedSection = 'inputs'"
          >
            Inputs
          </div>
          <InputSection v-if="selectedSection === 'inputs'" />
          <div
              class="section-caption"
              @click="selectedSection = 'content'"
          >
            Content
          </div>
          <ContentSection v-if="selectedSection === 'content'" />
          <div
              class="section-caption"
              @click="selectedSection = 'special'"
          >
            Special
          </div>
          <SpecialSection v-if="selectedSection === 'special'" />
        </div>
        <h3>Other features</h3>
        <router-link class="side-link" :to="{name: 'themes'}">
          Themes
        </router-link>

        <div class="theme-swapper">
          <span @click="changeTheme">Default</span>
          <span @click="changeTheme('light')">Light</span>
        </div>
      </div>
      <div class="section-view">
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
      selectedSection: null,
    }
  },
  computed: {
    currentRootRoute() {
      return this.$route.path.split('/').filter((value) => {return value !== ""})[0]
    }
  },
  watch: {
    currentRootRoute() {
      if (!this.selectedSection) {
        this.selectedSection = this.currentRootRoute
      }
    }
  },
  methods: {
    changeTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme)
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
  min-height: 100vh;
  height: fit-content;
  box-sizing: border-box;
}

.navigation-panel {
  display: flex;
  flex-direction: column;
  background-color: var(--panels-color);
  border: solid var(--border-color);
  border-width: 0 1px 0 0;
  width: 300px;
  padding: 16px;
  gap: 16px;
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

.section-view {
  box-sizing: border-box;
  padding: 64px;
  width: 100%;
}

.theme-swapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: auto;
  gap: 16px;
}

.theme-swapper span {
  cursor: pointer;
}

.side-link {
  color: var(--font-color);
  text-decoration: none;
}

.router-link-active {
  color: var(--accent-color)
}

footer {
  height: 100px;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--panels-color);
}
</style>