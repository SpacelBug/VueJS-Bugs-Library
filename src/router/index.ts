import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/inputs",
      children: [
        {
          name: "drop-down",
          path: "/drop-down",
          component: () => import("../views/inputs/DropDownView.vue"),
        },
      ],
    },
  ],
})

export default router
