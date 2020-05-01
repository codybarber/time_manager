/* eslint-disable */
<template>
  <div class="container-fluid">
    <b-row>
      <b-col lg="12">
        Dashboard
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <!-- <line-chart
          v-if="loaded"
          :chartdata="chartdata"
          :options="options"/> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>

import { uuid } from 'vue-idb'
import LineChart from '../components/line_chart.vue'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Dashboard',
  components: {LineChart},
  data () {
    return {
      entries: [],
      updated_entries: [],
      clients: [],
      client_options: [],
      projects: [],
      project_options: [],
      time_spent: null,
      date: null,
      note: null,
      submitted: false,
      reminder: false,
      client: null,
      project: null,
      loaded: false,
      chartdata: null
    }
  },
  mounted () {
    this.getClients();
    this.getProjects();
    this.update();
  },
  watch: {
    clients () {
      for (let i = 0; i < this.clients.length; i++) {
        this.client_options.push({value: this.clients[i].id, text: this.clients[i].name})
      }
    },
    projects () {
      for (let i = 0; i < this.projects.length; i++) {
        this.project_options.push({value: this.projects[i].id, text: `${this.projects[i].job_code} - ${this.projects[i].name}`})
      }
    },
    entries () {
      this.updated_entries = [];
      let self = this;
      this.chartdata = {
        label: 'Time',
        data: [20, 10, 50, 20]
      }
      // this.entries.forEach(function (value) {
      //   self.chartdata.push({
      //     client_id: value.client,
      //     client: self.clients.filter(client => client.id == value.client)[0].name,
      //     project_name: self.projects.filter(project => project.id == value.project)[0].name,
      //     project_id: value.project,
      //     project_job_code: self.projects.filter(project => project.id == value.project)[0].job_code,
      //     date: value.date,
      //     time_spent:  value.time_spent
      //   })
      // });
    }
  },
  methods: {
    update(){
      this.$db.entries.toArray().then( entries => this.entries = entries )
      this.chartdata = this.entries;
      this.loaded = true;
    },
    add (){
      this.$db.entries.add({ 
        id: uuid(),
        time_spent: this.time_spent,
        date: this.date,
        note: this.note,
        client: this.client,
        project_name: this.project.name,
        project_job_code: this.project.job_code,
        submitted: this.submitted,
        reminder: this.reminder
      }).then(() => this.update())
    },
    remove (entry){
      this.$db.entries.where('id').equals(entry.id).delete().then(() => this.update())
    },
    getClients(){
      this.$db.clients.toArray().then( clients => this.clients = clients )
    },
    getProjects(){
      this.$db.projects.toArray().then( projects => this.projects = projects )
    },
  }
}
</script>
