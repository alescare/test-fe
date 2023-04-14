<template>
  <textarea
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup lang="ts">
defineProps(['modelValue', 'placeholder'])
defineEmits(['update:modelValue'])
</script>

<style scoped>
textarea {
  resize: block;
  width: 90%;
  max-width: 500px;
}
</style>