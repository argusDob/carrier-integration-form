<template>
  <div class="grid">
    <div class="col-1">
      <SideBar />
    </div>
    <div class="col-11">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

import SideBar from './components/layout/shared/SideBar.vue';
import { carrierIntegrationService } from './api/CarrierIntegrationService';
import { useCarrierIntegrationStore } from './store/carrierIntegrationStore';

const carrierIntegrationStore = useCarrierIntegrationStore();

onMounted(() => {
  carrierIntegrationStore.init(carrierIntegrationService);
});
</script>

<style lang="scss">
body {
  font-family: 'Lato', sans-serif;
}
</style>
