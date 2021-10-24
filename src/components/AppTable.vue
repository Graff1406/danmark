<script setup lang="ts">
import { defineProps, defineEmits, PropType } from "vue";
import { Ids, Invoice, Invoices } from '../interfaces'

defineProps({ data: Array as PropType<Invoices>, loading: Boolean })

const emit = defineEmits<{
  (e: 'selected-rows', rows: Invoices): void
}>()

const getIdsSelectedRows = (rows: Invoices): void => {
  emit('selected-rows', rows)
}
</script>

<template>
  <el-card shadow="never">
    <el-table
      v-loading="loading"
      stripe
      ref="multipleTable"
      height="50vh"
      style="width: 100%"
      :data="data"
      @selection-change="getIdsSelectedRows"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="name" label="Name" />
      <el-table-column property="price" label="Price">
        <template #default="scope">${{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column property="qty" label="Qty" />
      <el-table-column label="Sum">
        <template #default="scope">${{ scope.row.total }}</template>
      </el-table-column>
    </el-table>
  </el-card>
</template>