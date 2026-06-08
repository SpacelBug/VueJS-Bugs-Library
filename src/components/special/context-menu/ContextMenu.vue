<template>
  <transition name="fade">
    <div
        v-if="isShow"
        ref="contextMenu"
        class="context-menu"
        tabindex="0"
        :style="`${posStringHorizontal}; ${posStringVertical}`"
        @focusout="isShow = false"
    >
      <ContextOption
          v-for="option in options"
          :option="option"
          :orientation-horizontal="this.drawDirection().horizontalDirection"
          @option-click="onOptionClick"
      />
    </div>
  </transition>
</template>

<script>
import ContextOption from './ContextOption.vue';

export default {
  name: "ContextMenu",
  components: {
    ContextOption,
  },
  props: {
    /**
     * Main context menu prop
     * ```js
     * [
     *  {name: 'Option 1', handler: () => {}},
     *  {name: 'Option 2', options: [
     *    name: 'Nested option 1', handler: () => {},
     *    name: 'Nested option 2', handler: () => {},
     *  ]},
     * ]
     * ```
     */
    options: { type: Array, required: true },
    /**
     * Experimental
     */
    position: { type: String, default: 'absolute', validator: (value) => {
      return ['absolute', 'fixed'].includes(value)
    }}
  },
  data() {
    return {
      isShow: false,

      posStringHorizontal: null,
      posStringVertical: null,
    }
  },
  mounted() {
    document.body.addEventListener('wheel', this.onDocumentWheel)
  },
  unmounted() {
    document.body.removeEventListener('wheel', this.onDocumentWheel)
  },
  methods: {
    findFirstRelativeParent() {
      let parentElement = this.$el.parentElement

      while (parentElement) {
        const style = window.getComputedStyle(parentElement)
        if (style.position === 'relative') {
          return parentElement
        }

        parentElement = parentElement.parentElement
      }

      return null
    },
    drawDirection() {
      let verticalDirection = event.clientY < (window.innerHeight / 2) ? 'toBottom' : 'toTop'
      let horizontalDirection = event.clientX < (window.innerWidth / 2) ? 'toLeft' : 'toRight'

      return ({ 'verticalDirection': verticalDirection, 'horizontalDirection': horizontalDirection })
    },
    getRelativeCursorPos(relativeElement) {
      const rect = relativeElement.getBoundingClientRect()

      return [event.pageX - rect.x, event.pageY - rect.y]
    },
    async showContextMenu() {
      await (this.isShow = true)

      const relativeParent = this.position !== 'fixed' ? this.findFirstRelativeParent() : null
      let cursorPosX = null
      let cursorPosY = null

      if (relativeParent) {
        cursorPosX = this.getRelativeCursorPos(relativeParent)[0]
        cursorPosY = this.getRelativeCursorPos(relativeParent)[1]
      } else {
        cursorPosX = event.pageX
        cursorPosY = event.pageY
      }

      if (this.drawDirection().horizontalDirection === 'toLeft') {
        this.posStringHorizontal = `left: ${cursorPosX}px`
      } else {
        let width = relativeParent ? relativeParent.getBoundingClientRect().width : window.innerWidth
        this.posStringHorizontal = `right: ${width - cursorPosX}px`
      }

      if (this.drawDirection().verticalDirection === 'toBottom') {
        this.posStringVertical = `top: ${cursorPosY}px`
      } else {
        let height = relativeParent ? relativeParent.getBoundingClientRect().height : window.innerHeight
        this.posStringVertical = `bottom: ${height - cursorPosY}px`
      }

      this.$refs.contextMenu.focus({ preventScroll: true })
    },
    hideContextMenu() {
      this.isShow = false
      this.posStringHorizontal = null
      this.posStringVertical = null
    },
    onOptionClick(option) {
      if (option.hasOwnProperty('handler')) {
        option.handler()
      }
    },
    onDocumentWheel() {
      this.hideContextMenu()
    }
  }
}
</script>

<style scoped>
.context-menu {
  position: v-bind(position);
  z-index: 1;
  border-radius: 5px;
  outline: none;
  background-color: var(--panels-color);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>