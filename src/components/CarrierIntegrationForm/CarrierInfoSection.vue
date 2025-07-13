<template>
  <div class="grid">
    <div class="col-12">
      <div class="field">
        <label for="intergration_set"
          >Select Intergration set<span class="text-red-700">*</span></label
        >
        <Select
          inputId="intergration_set"
          v-model="model.integrationSet"
          :options="integrationSetValues"
          optionLabel="label"
          optionValue="value"
          class="w-full surface-100"
        />
        <small v-if="validationErrors.integrationSet" class="p-error">{{
          validationErrors.integrationSet
        }}</small>
      </div>
    </div>
    <div class="col-6">
      <div class="field">
        <label for="label">Label<span class="text-red-700">*</span></label>
        <InputText inputId="label" v-model="model.label" class="w-full surface-100" />
        <small v-if="validationErrors.label" class="p-error">{{ validationErrors.label }}</small>
      </div>
    </div>
    <div class="col-6">
      <div class="field">
        <label for="reference">Reference<span class="text-red-700">*</span></label>
        <InputText inputId="reference" v-model="model.reference" class="w-full surface-100" />
        <small v-if="validationErrors.reference" class="p-error">{{
          validationErrors.reference
        }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineModel } from 'vue';
import { integrationSetValues } from '../../utilities/constants';

defineProps({
  validationErrors: {
    type: Object,
    default: () => ({}),
  },
});

const model = defineModel();
</script>
