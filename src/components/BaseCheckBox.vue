<template>
  <input
      type="checkbox"
      :checked="modelValue"
      @click="$emit('update:modelValue', $event.target.checked)"
  />
</template>

<script setup lang="ts">

defineProps(['modelValue'])
defineEmits(['update:modelValue'])

</script>

<style scoped>

</style>