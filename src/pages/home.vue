<script setup lang="ts">
import { computed } from 'vue'
import { Delete, CirclePlus } from '@element-plus/icons'

import AppHeader from '@/components/AppHeader.vue'
import AppTable from '@/components/AppTable.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppButton from '@/components/AppButton.vue'

import { Ids, WindowSize } from '../interfaces'

import tableComposables from '../composables/table'
import windowSize from '../composables/resize'

const winSizes:WindowSize = windowSize()

const {
  invoices,
  loading,
  selectedRows,
  addInvoice,
  deleteInvoice
} = tableComposables();

const total = computed((): number => {
  return invoices.value
    .reduce((ac: number, {price, qty}: {price: number, qty: number}): number => 
      (ac += price * qty), 0)
})

const winWidthLess900 = computed((): boolean => winSizes.width < 900)

const handleSelectionChange = (rows: Ids): void => { 
  selectedRows.value = rows 
}

</script>

<template>
  <el-container direction="vertical">
    <p class="title">Vue Invoice Calc</p>
    <app-header>
      <template #add-button="{formData, isInvalidForm}">
        <app-button
          label="Add"
          :icon="winWidthLess900"
          :size="winWidthLess900 ? 'small' : ''"
          :disabled="isInvalidForm || loading"
          @click="addInvoice(formData)"
        >
          <template #icon>
            <CirclePlus />
          </template>
        </app-button>
      </template>
    </app-header>
    <el-main>
      <AppTable
        :loading="loading"
        :data="invoices"
        @selected-rows="handleSelectionChange"
      /> 
    </el-main>
    <app-footer :total="total">
      <template #delete-button>
        <app-button
          label="Delete"
          :disabled="!selectedRows.length || loading"
          @click="deleteInvoice"
        >
          <template #icon>
            <delete />
          </template>
        </app-button>
      </template>
    </app-footer>
  </el-container>
</template>
<style scoped>
.title {
  font-size: 24px;
  font-weight: 700;
  margin-left: 24px;
}
</style>