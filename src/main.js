import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css'; // Asegúrate de que la ruta sea correcta

createApp(App)
  .use(router)
  .mount('#app');