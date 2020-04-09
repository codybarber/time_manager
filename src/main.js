import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueIdb from 'vue-idb'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(VueIdb)
Vue.use(iView)

const idb = new VueIdb({
  version: 1,
  database: 'worktime',
  schemas: [
    { clients: 'id, name' },
    { projects: 'id, client_name, job_code' },
    { entries: 'id, time_spent, date, note, client, project_name, project_job_code, submitted, reminder' }
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  idb: idb,
  render: h => h(App)
}).$mount('#app')
