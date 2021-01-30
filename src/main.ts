import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './app.scss'
import 'element-plus/lib/theme-chalk/index.css';
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElInput,
  ElButton,
  ElCard,
  ElPagination,
} from "element-plus";

const app = createApp(App);

const elComps = [
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElInput,
  ElButton,
  ElCard,
  ElPagination,
]

elComps.forEach(comp => app.component(comp.name, comp))

app
  .use(store)
  .use(router)
  .mount("#app");
