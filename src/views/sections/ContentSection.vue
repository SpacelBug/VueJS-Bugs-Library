<template>
  <div class="components">
    <router-link
        :to="{name: 'spoiler'}"
        class="side-link"
    >
      Spoiler
    </router-link>
    <router-link
        :to="{ name: 'expandable-image' }"
        class="side-link"
    >
      ExpandableImage
    </router-link>
    <router-link
        :to="{ name: 'modal-window' }"
        class="side-link"
    >
      ModalWindow
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ContentSection',
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