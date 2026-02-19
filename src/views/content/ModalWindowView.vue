<template>
  <div class="component-view">
    <div class="component-variants">
      <div class="component-variant">
        <button @click="isShowModal = true">Show modal</button>
        <ModalWindow
            v-if="isShowModal"
            @focusout=""
            @closeModal="isShowModal = false"
            :width="500"
            :height="300"
        >
          <h1>Modal window</h1>
          <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam unde reprehenderit perspiciatis
            veniam dolore quo placeat at voluptates doloremque iste ex, excepturi ducimus illo, quos eligendi sit
            incidunt aut commodi.</span>
        </ModalWindow>
      </div>
    </div>


    <div class="description">
      <h3>Modal window component</h3>
      <p></p>
      <p><b>Props:</b></p>
      <p><u>height:</u> Number</p>
      <p><u>width:</u> Number</p>
      <p><u>certain:</u> Boolean</p>
      <p><u>closeOnOuterClick:</u> Boolean</p>
    </div>
  </div>
</template>

<script>
import ModalWindow from '@/components/content/ModalWindow.vue';

export default {
  name: "ModalWindowView",
  components: {
    ModalWindow,
  },
  data() {
    return {
      isShowModal: false,
    }
  }
}
</script>

<style scoped>
.component-view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}

.component-variants {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
}

.component-variant {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: fit-content;
}
</style>