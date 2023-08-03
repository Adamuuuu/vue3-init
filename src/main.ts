import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "normalize.css";
import "../src/assets/css/reset.css";
import "../src/assets/css/common.css";
import "element-plus/dist/index.css";
import Element from "element-plus";

const app = createApp(App);

app.use(createPinia());

app.use(router);
app.use(Element);

app.mount("#app");
