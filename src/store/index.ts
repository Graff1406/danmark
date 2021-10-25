import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import {
  getInvoices as getList,
  createInvoice as create,
  deleteInvoice as remove
} from '@/api/firebase/index'

import { Invoice, Invoices } from '@/interfaces'

export interface State {
  invoices: Invoices
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    invoices: []
  },
  mutations: {
    setInvoices(state: State, invoices: Invoices): void {
      state.invoices = invoices
    }
  },
  actions: {
    async getInvoices({ commit }): Promise<void> {
      const invoices = await getList()
      commit('setInvoices', invoices)
    },
    async createInvoice({ dispatch }, invoice: Invoice): Promise<void> {
      await create(invoice)
      await dispatch('getInvoices')
    },
    async deleteInvoice({ dispatch }, ids: string[]): Promise<void> {
      await remove(ids)
      await dispatch('getInvoices')
    }
  }
})

export function useStore() {
  return baseUseStore(key)
}