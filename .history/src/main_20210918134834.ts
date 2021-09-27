import { createApp } from 'vue'
import App from "./App.vue";
import store from "./store";
import router from "./router"

createApp(App).mount('#app')
app.use(ElementPlus, { locale })
app.use(store).use(router).mount("#app")
