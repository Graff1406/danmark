import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore/lite'

import firebaseConfig from './config.json'

import { Invoice, Invoices } from '../../interfaces/table'

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const invoicesCollection = collection(db, 'invoices')

export async function getInvoices(): Promise<any> {
  const invoiceSnapshot = await getDocs(invoicesCollection)
  return invoiceSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
}

export async function createInvoice(invoice: Invoice): Promise<void> {
  await addDoc(invoicesCollection, invoice)
}

export async function deleteInvoice(ids: string[]): Promise<void> {
  for (const id of ids) await deleteDoc(doc(db, "invoices", id))
}