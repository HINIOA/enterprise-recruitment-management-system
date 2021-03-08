import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './app.scss'
import 'element-plus/lib/theme-chalk/index.css';
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
  ElMenu,
  ElMenuItem,
  ElCard,
  ElPagination,
  ElCarousel,
  ElCarouselItem,
  ElInput,
  ElButton,
  ElRow,
  ElCol,
  ElDialog,
  ElForm,
  ElFormItem,
  ElSelect,
  ElOption,
  ElUpload,
  ElRadio,
  ElRadioGroup,
  ElLoading,
  ElLink,
  ElSteps,
  ElStep,
  ElTooltip,
  ElDropdownMenu,
  ElDropdownItem,
  ElDropdown,
} from "element-plus";

const app = createApp(App);

const elComps = [
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
  ElMenu,
  ElMenuItem,
  ElInput,
  ElButton,
  ElCard,
  ElPagination,
  ElCarousel,
  ElCarouselItem,
  ElRow,
  ElCol,
  ElDialog,
  ElForm,
  ElFormItem,
  ElSelect,
  ElOption,
  ElUpload,
  ElRadioGroup,
  ElRadio,
  ElLink,
  ElSteps,
  ElStep,
  ElTooltip,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
]

elComps.forEach(comp => app.component(comp.name, comp))

app
  .use(ElLoading)
  .use(router)
  .mount("#app");
