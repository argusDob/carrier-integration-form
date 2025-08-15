import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
const CarrierIntegrationFormView = () => import('../views/CarrierIntegrationFormView.vue');

const useHash = import.meta.env.VITE_FORCE_HASH === '1';

const router = createRouter({
  history: useHash
    ? createWebHashHistory() // previews
    : createWebHistory(import.meta.env.BASE_URL), // production
  routes: [
    { path: '/', redirect: '/carrier/create' },
    { path: '/carrier/create', name: 'CarrierCreate', component: CarrierIntegrationFormView },
    { path: '/carrier/:id', name: 'CarrierEdit', component: CarrierIntegrationFormView },
  ],
});

export default router;
