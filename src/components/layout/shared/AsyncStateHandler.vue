<template>
  <div>
    <template v-if="isLoading">
      <slot name="fallback">
        <p class="text-gray-500">Loading...</p>
      </slot>
    </template>

    <template v-else-if="error">
      <slot name="error" :error="error">
        <p class="text-red-500">Error: {{ error }}</p>
      </slot>
    </template>

    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  error: {
    type: String,
    default: null,
  },
});
</script>
