<script setup lang="ts">

import { defineProps } from "vue"

defineProps({ total: Number })

</script>

<template>
  <el-footer>
    <el-card shadow="never">
      <el-row :gutter="20" align="middle">
        <el-col :span="19" :xs="15">
          <slot name="delete-button"></slot>
        </el-col>
        <el-col :span="5" :xs="9">
          <span class="total-label">Total:</span>
          <span>${{ total }}</span>
        </el-col>
      </el-row>
    </el-card>
  </el-footer>
</template>

<style scoped>
.total-label {
  margin-right: 15px;
}
</style>