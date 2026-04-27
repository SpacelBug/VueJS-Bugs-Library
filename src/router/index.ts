import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/inputs",
      children: [
        {
          name: "switch",
          path: "switch",
          component: () => import("../views/inputs/SwitchView.vue"),
        },
        {
          name: "drop-down",
          path: "drop-down",
          component: () => import("../views/inputs/DropDownView.vue"),
        },
        {
          name: "multi-drop-down",
          path: "multi-drop-down",
          component: () => import("../views/inputs/MultiDropDownView.vue"),
        },
        {
          name: "time-input",
          path: "time-input",
          component: () => import("../views/inputs/TimeInputView.vue"),
        },
        {
          name: "date-input",
          path: "date-input",
          component: () => import("../views/inputs/DateInputView.vue"),
        },
        {
          name: "slider",
          path: "slider",
          component: () => import("../views/inputs/SliderView.vue"),
        },
        {
          name: "range",
          path: "range",
          component: () => import("../views/inputs/RangeView.vue"),
        },
        {
          name: "file-input",
          path: "file-input",
          component: () => import("../views/inputs/FileInputView.vue"),
        },
        {
          name: "check-box",
          path: "check-box",
          component: () => import("../views/inputs/CheckBoxView.vue"),
        },
        {
          name: "number-input",
          path: "number-input",
          component: () => import("../views/inputs/NumberInputView.vue"),
        },
        {
          name: "area-input",
          path: "area-input",
          component: () => import("../views/inputs/AreaInputView.vue"),
        },
        {
          name: "mask-input",
          path: "mask-input",
          component: () => import("../views/inputs/InputMaskView.vue"),
        },
      ],
    },
    {
      path: "/special",
      children: [
        {
          name: "tool-tip",
          path: "tool-tip",
          component: () => import("../views/special/ToolTipView.vue"),
        },
        {
          name: "context-menu",
          path: "context-menu",
          component: () => import("../views/special/ContextMenuView.vue"),
        },
        {
          name: "style-variables",
          path: "style-variables",
          component: () => import("../views/special/StyleVariablesView.vue"),
        },
        {
          name: "tags",
          path: "tags",
          component: () => import("../views/special/TagsView.vue"),
        },
      ],
    },
    {
      path: "/content",
      children: [
        {
          name: "expandable-image",
          path: "expandable-image",
          component: () => import("../views/content/ExpandableImageView.vue"),
        },
        {
          name: "spoiler",
          path: "spoiler",
          component: () => import("../views/content/SpoilerView.vue"),
        },
        {
          path: "modal-window",
          name: "modal-window",
          component: () => import("@/views/content/ModalWindowView.vue"),
        },
        {
          path: "tree",
          name: "tree",
          component: () => import("@/views/content/TreeView.vue"),
        },
        {
          path: "moveable-modal",
          name: "moveable-modal",
          component: () => import("@/views/content/MoveableModalView.vue"),
        },
        {
          path: "contents",
          name: "contents",
          component: () => import("@/views/content/ContentsView.vue"),
        },
      ],
    },
    {
      path: "/features",
      children: [
        {
          name: "themes",
          path: "/themes",
          component: () => import("@/views/features/ThemesView.vue"),
        },
      ],
    },
    {
      name: "animated-backgrounds",
      path: "/animated-backgrounds",
      component: () =>
        import("../views/animated-backgrounds/AnimatedBackgrounds.vue"),
    },
  ],
})

export default router
