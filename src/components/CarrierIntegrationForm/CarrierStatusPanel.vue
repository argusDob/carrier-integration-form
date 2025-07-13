<template>
  <Card class="shadow-3">
    <template #header>
      <div class="flex flex-column ml-3 mt-2">
        <span class="font-bold">{{ carrierInfo?.name }}</span>
        <span>{{ carrierInfo?.code }}</span>
      </div>
    </template>
    <template #content>
      <Panel
        v-for="[key, value] in Object.entries(carrierInfo.statuses)"
        :key="key"
        class="mb-2 surface-100"
      >
        <template #header>
          <span class="font-bold">{{ key?.toUpperCase() }}</span></template
        >

        <template #default>
          <SelectButton
            v-if="model[key].isEditable"
            v-model="model[key].status"
            :options="options"
            size="medium"
          />
          <Tag
            v-else="!model[key].isEditable"
            severity="success"
            :value="model[key].status || '?'"
            class="ml-1 p-1"
          ></Tag>
        </template>
      </Panel>
    </template>
  </Card>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  carrierInfo: {
    type: Object,
    required: true,
  },
});

const options = ref(['Test mode', 'Pending']);

const model = defineModel();
</script>
