import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/inputs",
      children: [
        {
          name: "switch",
          path: "/switch",
          component: () => import("../views/inputs/SwitchView.vue"),
        },
        {
          name: "drop-down",
          path: "/drop-down",
          component: () => import("../views/inputs/DropDownView.vue"),
        },
        {
          name: "spoiler",
          path: "/spoiler",
          component: () => import("../views/inputs/SpoilerView.vue"),
        },
      ],
    },
  ],
})

export default router
