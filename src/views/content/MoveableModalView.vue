<template>
  <div class="component-view">
    <div class="component-variants">
      <div class="component-variant">
        <MoveableModal style="width: 400px;">
          <h3>Moveable modal</h3>
          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum voluptas eaque quibusdam facere sapiente!
            Inventore esse sit provident similique saepe rerum velit, dolores, eos, dolorem obcaecati excepturi dolorum
            reiciendis. Dolore!
          </span>
        </MoveableModal>
      </div>
    </div>


    <div class="description">
      <h3>Moveable Modal component</h3>
      Contents of model setting by slot
      <p><b>props:</b></p>
      <p><u>startPosX</u></p>
      <p><u>startPosY</u></p>
    </div>
  </div>
</template>

<script>
import MoveableModal from '@/components/content/MoveableModal.vue';

export default {
  name: "MoveableModalView",
  components: {
    MoveableModal,
  },
  data() {
    return {

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

.description {
  width: 500px;
}
</style>