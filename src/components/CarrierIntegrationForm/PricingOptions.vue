<template>
  <span class="font-bold">{{ title }}</span>
  <div class="flex flex-row gap-2">
    <div v-for="option in pricingOptions" :key="option.value">
      <RadioButton
        :inputId="option.value"
        :value="option.value"
        v-model="model"
        :name="'pricing'"
        class="mr-2"
      />
      <label :for="option.value">{{ option.label }}</label>
    </div>
  </div>
</template>

<script setup>
import { defineModel } from 'vue';
import { pricingOptions } from '../../utilities/constants';

defineProps({
  title: {
    type: String,
    default: '',
  },
});

const model = defineModel();
</script>
