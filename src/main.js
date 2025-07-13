import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import Aura from '@primeuix/themes/aura';

const app = createApp(App);
const pinia = createPinia();

import 'primeflex/primeflex.css';
import '../src/assets/styles/font.css';

app
  .use(pinia)
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: false,
      },
    },
  })
  .mount('#app');
