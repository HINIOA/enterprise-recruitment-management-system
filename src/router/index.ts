import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/jobs",
    name: "jobList",
    component: () => import("../views/JobList.vue"),
  },
  {
    path: "/job-detail/:id",
    name: "jobDetail",
    component: () => import("../views/JobDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes,
});

export default router;
