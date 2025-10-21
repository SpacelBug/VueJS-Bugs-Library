<template>
  <div class="components">
    <router-link
        to="switch"
        class="side-link"
    >
      Switch
    </router-link>
    <router-link
        to="drop-down"
        class="side-link"
    >
      DropDown
    </router-link>
    <router-link
        :to="{ name: 'color-picker' }"
        class="side-link"
    >
      ColorPicker
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'InputSection',
};
</script>

<style scoped>
.components {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 16px;
}

.side-link {
  color: white;
  text-decoration: none;
}

.router-link-active {
  color: var(--accent-color)
}
</style>