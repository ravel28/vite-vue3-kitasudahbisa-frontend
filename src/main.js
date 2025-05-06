import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SweetAlertPlugin from './assets/sweet-alert/sweetalert';

createApp(App)
  .use(router)
  .use(SweetAlertPlugin)
  .mount('#app');

  console.log(
    `%c Ravel28`,
    'color: white; font-weight: bold; font-size: 200px;',
  )
  
  
  console.log(
    `%c 🔥 Diam dan buktiikan`,
    'color: #42b883; font-size: 14px; font-weight: bold;'
  )
  