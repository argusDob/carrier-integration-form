<template>
  <div class="flex flex-row justify-content-end mb-2">
    <router-link to="/carrier/123">
      <Button label="Edit" class="mr-2" severity="secondary"></Button
    ></router-link>

    <Button label="Save" @click="submit"></Button>
  </div>

  <AsyncStateHandler :isLoading="isLoading" :error="apiErrors">
    <template #default>
      <div class="grid">
        <div class="col-8">
          <Card class="shadow-3">
            <template #content>
              <div class="flex flex-column gap-2">
                <CarrierInfoSection
                  v-model="form.carrierInfo"
                  :validationErrors="validationErrors"
                />
                <CarrierModuleConfigPanel
                  v-for="mod in moduleConfigSchema"
                  :key="mod.key"
                  :title="mod.title"
                  :fields="mod.configFields"
                  v-model="form.modules[mod.key]"
                />
                <PricingOptions v-model="form.pricing" title="Pricing" />
                <CancelOrderOptions v-model="form.cancelOrder.options" title="Cancel Order" />
              </div>
            </template>
          </Card>
        </div>
        <div class="col-4">
          <CarrierStatusPanel v-model="form.carrierInfo.statuses" :carrierInfo="form.carrierInfo" />
        </div>
      </div>
    </template>
    <template #fallback> ...Loading </template>
    <template #error="{ error }">{{ error }} </template>
  </AsyncStateHandler>
</template>

<script setup>
import { computed, onMounted, ref, watch, onErrorCaptured } from 'vue';
import { useCarrierIntegrationStore } from '../store/carrierIntegrationStore';
import { useRoute } from 'vue-router';

import CarrierInfoSection from '../components/CarrierIntegrationForm/CarrierInfoSection.vue';
import CarrierModuleConfigPanel from '../components/CarrierIntegrationForm/CarrierModuleConfigPanel.vue';
import PricingOptions from '../components/CarrierIntegrationForm/PricingOptions.vue';
import CarrierStatusPanel from '../components/CarrierIntegrationForm/CarrierStatusPanel.vue';
import AsyncStateHandler from '../components/layout/shared/AsyncStateHandler.vue';

import { moduleConfigSchema } from '../utilities/constants';
import { useFormInputValidator } from '../composables/useFormInputValidator';

const carrierIntegrationStore = useCarrierIntegrationStore();
const route = useRoute();

const form = ref();
const isLoading = ref(true);
const validationErrors = ref();
const REQUIRED_FIELDS = ['integrationSet', 'label', 'reference'];

watch(
  () => route.params.id,
  async newId => {
    if (newId) {
      await init(newId);
      validationErrors.value = {};
    } else {
      initializeEmptyForm();
    }
  }
);

const apiErrors = computed(() => carrierIntegrationStore.error);

function initializeEmptyForm() {
  carrierIntegrationStore.resetFormState();
  form.value = carrierIntegrationStore.formData;
  validationErrors.value = {};
  isLoading.value = false;
}

async function init() {
  await carrierIntegrationStore.loadForm();
  form.value = carrierIntegrationStore.formData;
  isLoading.value = false;
}

async function submit() {
  const { validate, validationReport } = useFormInputValidator(
    form.value.carrierInfo,
    REQUIRED_FIELDS
  );

  validate();
  validationErrors.value = validationReport;

  if (!validationReport.isValid) {
    alert('Ooops required fiedls are missing');
    return;
  }

  await carrierIntegrationStore.submitForm();
}

onMounted(async () => {
  const carrierId = route.params.id;
  carrierIntegrationStore.resetFormState();

  if (carrierId === undefined) {
    form.value = carrierIntegrationStore.formData;
    isLoading.value = false;
  } else {
    await init();
  }
});

onErrorCaptured(error => {
  carrierIntegrationStore.error = `Unexpected Error + ${error}`;
  return false;
});
</script>
