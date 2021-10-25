import { ref, computed, onMounted } from 'vue'

import { Ids, Invoice, Invoices } from '@/interfaces'

import { useStore } from '@/store/index'

export default () => {

  const store = useStore()

  const invoices = computed(() => store.state.invoices)

  const loading = ref<boolean>(false)

  const selectedRows = ref<Invoices>([])

  const dispatch = async (method: string = 'getInvoices', params?: any): Promise<void> => {
    loading.value = !loading.value
    await store.dispatch(method, params)
    loading.value = !loading.value
  }

  const addInvoice = (invoice: Invoice): void => {
    const total: number = +invoice.price * +invoice.qty
    const item: Invoice = { ...invoice, total: total.toFixed(2) }

    dispatch('createInvoice', item)
  }

  const deleteInvoice = (): void => {
    const ids: Ids = selectedRows.value.map((item: Invoice): any => item.id)

    dispatch('deleteInvoice', ids)
  }

  onMounted(dispatch);

  return {
    invoices,
    loading,
    selectedRows,
    addInvoice,
    deleteInvoice
  }
}