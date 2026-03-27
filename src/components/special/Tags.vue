<template>
  <div class="tags">
    <transition-group
        name="fade"
        @before-leave="beforeLeave"
    >
      <template v-for="(tag, index) in tags">
        <div
            v-if="index < max || isShowAll"
            :key="tag"
            class="tag"
        >
          <div
              class="tag-name"
              @click="$emit('click', tag)"
          >
            {{ tag }}
          </div>
          <div
              v-if="editable"
              @click="tags.splice(index, 1)"
              class="cross"
          >
            X
          </div>
        </div>
      </template>
    </transition-group>

    <div
        class="plus-button"
        v-if="editable && !isShowInput"
        @click="isShowInput = true; $nextTick(() => $refs.input.focus())"
    >+
    </div>

    <div
        v-if="tags.length > max && !isShowAll"
        class="hidden-tags"
        @click="isShowAll = !isShowAll"
    >
      +{{ tags.length - max }}
    </div>

    <input
        type="text"
        v-if="editable && isShowInput"
        ref="input"
        @keydown.enter="(event) => {
          if (event.target.value) {
            tags.push(event.target.value);
            event.target.value = '';
            $emit('change', tags);
          }
        }"
        @focusout="isShowInput = false"
        @keydown.escape="isShowInput = false"
    >
  </div>
</template>

<script>

export default {
  name: "Tags",
  emits: ['change', 'click'],
  props: {
    tags: { type: [String, Array], required: true },
    editable: { type: Boolean, default: false },
    max: { type: Number, default: Infinity },
  },
  data() {
    return {
      isShowAll: false,
      isShowInput: false,
    }
  },
  watch: {
    tags: {
      handler: function () {
        this.$emit('change', this.tags)
      }, deep: true
    }
  },
  methods: {
    beforeLeave(el) {
      const container = el.parentNode;
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      el.style.left = (elRect.left - containerRect.left) + 'px';
      el.style.top = (elRect.top - containerRect.top) + 'px';
      el.style.width = el.offsetWidth + 'px';
      el.style.position = 'absolute';
    }
  }
}
</script>

<style scoped>
.tags {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 8px;
}

input {
  position: absolute;
  left: 0;
  top: 100%;
  margin-top: 4px;
}

.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  background-color: var(--panels-color);
  padding: 4px 16px;
  width: fit-content;
  border-radius: 16px;
}

.tag-name {
  cursor: pointer;
}

.cross {
  cursor: pointer;
}

.tag-name:hover,
.hidden-tags:hover,
.plus-button:hover,
.cross:hover {
  color: var(--accent-color);
}

.plus-button,
.hidden-tags {
  box-sizing: border-box;
  cursor: pointer;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}

/*Transition*/

.fade-enter-active,
.fade-leave-active,
.fade-move {
  transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>