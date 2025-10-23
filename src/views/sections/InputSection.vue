<template>
  <div class="components">
    <router-link
        :to="{name: 'switch'}"
        class="side-link"
    >
      Switch
    </router-link>
    <router-link
        :to="{name: 'drop-down'}"
        class="side-link"
    >
      DropDown
    </router-link>
    <router-link
        :to="{name: 'time-input'}"
        class="side-link"
    >
      TimeInput
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