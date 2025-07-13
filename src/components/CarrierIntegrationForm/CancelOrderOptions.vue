<template>
  <span class="font-bold mt-2">{{ title }}</span>
  <div class="field-checkbox flex flex-wrap gap-4">
    <div v-for="option in cancelOptions" :key="option.key" class="flex align-items-center gap-2">
      <Checkbox :inputId="option.key" v-model="model[option.key]" :binary="true" />
      <label :for="option.key">{{ option.label }}</label>
    </div>
  </div>
</template>
<script setup>
import { defineModel } from 'vue';
import { cancelOptions } from '../../utilities/constants';

defineProps({
  title: {
    type: String,
    default: '',
  },
});

const model = defineModel();
</script>
