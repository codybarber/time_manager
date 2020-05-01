import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueIdb from 'vue-idb'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import JsonCSV from 'vue-json-csv'
import VueCharts from 'vue-chartjs'

 
Vue.component('downloadCsv', JsonCSV)

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueIdb)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

const idb = new VueIdb({
  version: 1,
  database: 'hmdb',
  schemas: [
    { clients: 'id, name' },
    { projects: 'id, name, client, job_code' },
    { entries: 'id, time_spent, date, note, client, project, submitted, reminder' }
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  idb: idb,
  render: h => h(App)
}).$mount('#app')
