<template>
  <div class="components">
    <router-link
        :to="{ name: 'mask-input' }"
        class="side-link"
    >
      MaskInput
    </router-link>
    <router-link
        :to="{ name: 'number-input' }"
        class="side-link"
    >
      NumberInput
    </router-link>
    <router-link
        :to="{ name: 'area-input' }"
        class="side-link"
    >
      AreaInput
    </router-link>
    <router-link
        :to="{name: 'time-input'}"
        class="side-link"
    >
      TimeInput
    </router-link>
    <router-link
        :to="{ name: 'date-input' }"
        class="side-link"
    >
      DateInput
    </router-link>
    <router-link
        :to="{name: 'file-input'}"
        class="side-link"
    >
      FileInput
    </router-link>
    <router-link
        :to="{ name: 'switch' }"
        class="side-link"
    >
      Switch
    </router-link>
    <router-link
        :to="{ name: 'drop-down' }"
        class="side-link"
    >
      DropDown
    </router-link>
    <router-link
        :to="{ name: 'multi-drop-down' }"
        class="side-link"
    >
      MultiDropDown
    </router-link>
    <router-link
        :to="{ name: 'slider' }"
        class="side-link"
    >
      Slider
    </router-link>
    <router-link
        :to="{ name: 'range' }"
        class="side-link"
    >
      Range
    </router-link>
    <router-link
        to="check-box"
        class="side-link"
    >
      CheckBox
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
  color: var(--font-color);
  text-decoration: none;
}

.router-link-active {
  color: var(--accent-color)
}
</style>