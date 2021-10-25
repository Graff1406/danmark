import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore/lite'

import firebaseConfig from './config.json'

import { Invoice } from '../../interfaces/table'

import { ElNotification } from 'element-plus'

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const invoicesCollection = collection(db, 'invoices')

export async function getInvoices(): Promise<any> {
  try {
    const invoiceSnapshot = await getDocs(invoicesCollection)
    return invoiceSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  } catch (e) {
    showErrorMessage('Unfortunately, you cannot receive invoices')
  }
}

export async function createInvoice(invoice: Invoice): Promise<void> {
  try {
    await addDoc(invoicesCollection, invoice)
  } catch (e) {
    showErrorMessage('Unfortunately, you cannot create invoice')
  }
}

export async function deleteInvoice(ids: string[]): Promise<void> {
  try {
    for (const id of ids) await deleteDoc(doc(db, "invoices", id))
  } catch (e) {
    showErrorMessage('Unfortunately, you cannot delete invoice')
  }
}

function showErrorMessage(message: string): void {
  ElNotification({
    title: 'Error',
    message,
    type: 'error',
  })
}