<template>
  <button :class="[
      type=='outline'? outline : '',
        type=='text'? text: '',
         type=='solid'? solid: ''
         ]"
          :disabled="disabled">
    <slot/>
  </button>
</template>

<script setup lang="ts">

const props = defineProps({
  type: String,
  disabled: Boolean
})
const outline = 'border-2 border-black rounded-md hover:bg-slate-300';
const text = 'mx-1 px-1 rounded-sm hover:bg-slate-300';
const solid = 'rounded col-span-2 sm:col-span-1 me-1 mt-2 self-start bg-red-400 hover:bg-red-600 text-white';

</script>

<style scoped>

</style>