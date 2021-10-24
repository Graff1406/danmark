import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { maska } from 'maska'

import { store, key } from './store'

import 'element-plus/dist/index.css'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(store, key)

app.directive('maska', maska);

app.mount('#app')
