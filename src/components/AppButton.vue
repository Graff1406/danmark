<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps({
  label: String,
  size: {
    type: String,
    default: 'medium'
  },
  disabled: Boolean,
  icon: Boolean
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

</script>

<template>
<el-button
  plain
  type="primary" 
  :size="size"
  :disabled="disabled"
  @click="emit('click')" 
>
  <el-icon v-if="icon">
    <slot name="icon"></slot>
  </el-icon>
  <span v-else class="app-flex app-align-center">
    <el-icon class="app-mr-1">
      <slot name="icon"></slot>
    </el-icon>
    {{label}}
  </span>
</el-button>
</template>
<style scoped>
.app-flex {
  display: flex;
}
.app-align-center {
  align-items: center;
}
.app-mr-1 {
  margin-right: 8px
}
</style>