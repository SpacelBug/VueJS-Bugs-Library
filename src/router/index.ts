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
          name: "spoiler",
          path: "spoiler",
          component: () => import("../views/inputs/SpoilerView.vue"),
        },
        {
          name: "time-input",
          path: "time-input",
          component: () => import("../views/inputs/TimeInputView.vue"),
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
      ],
    },
    {
      path: "/content",
      children: [
        {
          path: "modal-window",
          name: "modal-window",
          component: () => import("@/views/content/ModalWindowView.vue"),
        }
      ]
    }
  ],
})

export default router
