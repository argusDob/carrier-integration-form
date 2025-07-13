<template>
  <div>
    <span class="font-bold">{{ title }}</span>
    <Panel class="surface-100 mt-2">
      <template #header>
        <div>
          <Checkbox :inputId="fields.key" v-model="model[fields.key]" name="model" binary />
          <label :for="fields.key" class="ml-2">
            {{ fields.label }}
          </label>
        </div>
      </template>
      <template #default>
        <p class="m-0">{{ fields.text }}</p>
      </template>
    </Panel>
  </div>
</template>

<script setup>
defineProps({
  fields: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
});

const model = defineModel();
</script>
