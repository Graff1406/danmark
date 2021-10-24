<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue'

import { Invoice } from '../interfaces'

const form = ref<Invoice>({
  name: '',
  price: '',
  qty: ''
})

const isInvalidForm = computed(() => 
  !form.value.name || !form.value.price || !form.value.qty
)

</script>

<template>
  <el-header class="app-mb-3">
    <el-card shadow="never">
      <el-row :gutter="20" align="middle">
        <el-col :span="13" :xs="7">
          <el-input v-model="form.name" placeholder="Name" />
        </el-col>
        <el-col :span="4" :xs="6">
          <el-input v-model="form.price" v-maska="'#*.##'" placeholder="Price" />
        </el-col>
        <el-col :span="4" :xs="6">
          <el-input v-model="form.qty" v-maska="'#*'" placeholder="Quantity" />
        </el-col>
        <el-col :span="3" :xs="5">
          <el-row justify="end">
            <slot
              name="add-button"
              :is-invalid-form="isInvalidForm"
              :form-data="form"
            ></slot>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </el-header>
</template>

<style scoped>
.flex {
  display: flex;
}
.align-center {
  align-items: center;
}
.app-mb-3 {
  margin-bottom: 24px;
}
</style>
