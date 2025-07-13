import { createRouter, createWebHistory } from 'vue-router';
const CarrierIntegrationFormView = () => import('../views/CarrierIntegrationFormView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/carrier/create',
    },
    {
      path: '/carrier/create',
      name: 'CarrierCreate',
      component: CarrierIntegrationFormView,
    },
    {
      path: '/carrier/:id',
      name: 'CarrierEdit',
      component: CarrierIntegrationFormView,
    },
  ],
});

export default router;
