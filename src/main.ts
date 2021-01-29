import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElCarousel, ElCarouselItem } from 'element-plus';

const app = createApp(App)

app.component(ElCarousel.name, ElCarousel)
app.component(ElCarouselItem.name, ElCarouselItem)

app.use(store).use(router).mount('#app')
