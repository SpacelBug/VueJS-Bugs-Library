<template>
  <div class="main-box">
    <div
        v-for="(value, style) in variables"
        class="variable"
    >
      <div class="name">{{ style }}</div>
      <input
          class="value"
          :value="value"
          :type="typeOfVariable(value)"
          @change="onChangeVariable(style)"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'StyleVariables',
  props: {
    variablePrefix: { type: String, default: '--' },
    excludeSubString: { type: String, default: 'vue'}
  },
  data() {
    return {
      variables: {},
    }
  },
  mounted() {
    let allStyles = getComputedStyle(document.body)

    for (let style of allStyles) {
      if (style.startsWith(this.variablePrefix) && !style.includes(this.excludeSubString)) {
        this.variables[style] = allStyles.getPropertyValue(style)
      }
    }
  },
  methods: {
    typeOfVariable(value) {
      if (
        /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value) ||
        /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*[01]?\.?\d*\s*)?\)$/.test(value) ||
        /^hsla?\(\s*-?\d+(deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*[01]?\.?\d*\s*)?\)$/.test(value)
      ) {
        return 'color'
      } else {
        return 'text'
      }
    },
    onChangeVariable(style) {
      document.documentElement.style.setProperty(style, event.target.value)
    }
  }
}
</script>

<style scoped>
.main-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.variable {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
</style>