<template>
  <div class="component-view">
    <div class="component-variants">
      <div class="component-variant">
        <div class="caption"> Set tool-tip content by prop</div>
        <tool-tip :description="'Some tip text'">
          Text with tool-tip
        </tool-tip>
      </div>
      <div class="component-variant">
        <div class="caption"> Set tool-tip content by slot</div>
        <tool-tip :description="'Some tip text'">
          Text with tool-tip
          <template v-slot:text>
            <p><b>Some slotted text</b></p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur tenetur totam nisi ullam repellendus
              excepturi illo earum illum nam dolorum praesentium, nulla voluptatem ab ex alias quaerat optio sed
              sapiente!
            </p>
          </template>
        </tool-tip>
      </div>
    </div>


    <div class="description">
      <h3>Tool-Tip component</h3>
      <div class="description">
        <p></p>
        <p><b>Props:</b></p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import ToolTip from '@/components/special/ToolTip.vue';

export default {
  name: 'ToolTipView',
  components: {
    ToolTip,
  },
};
</script>

<style scoped>
.component-view {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.component-variants {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.component-variant {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>