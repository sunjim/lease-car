import { createSSRApp } from "vue";
import * as Pinia from 'pinia';
import App from "./App.vue";
//加入可持久话参数 插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


Pinia.createPinia().use(piniaPluginPersistedstate)
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  return {
    app,
    Pinia, // 此处必须将 Pinia 返回
  };
}
