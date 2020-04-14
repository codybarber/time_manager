/* eslint-disable */
<template>
  <div class="container-fluid">
    <b-row>
      <b-col lg="12">
        Dashboard
      </b-col>
    </b-row>
  </div>
</template>

<script>

import { uuid } from 'vue-idb'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Dashboard',
  data () {
    return {
      entries: [],
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
      project: null
    }
  },
  mounted () {
    this.update();
    this.getClients();
    this.getProjects();
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
    }
  },
  methods: {
    update(){
      this.$db.entries.toArray().then( entries => this.entries = entries )
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
