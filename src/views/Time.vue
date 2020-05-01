/* eslint-disable */
<template>
  <div class="container-fluid">
    <b-row class="sub-header-row">
      <b-col lg="5">
        <span class="sub-header">Time</span>
      </b-col>
      <b-col lg="3" class="">
        <b-input
          id="filter"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Search table here..."
          v-model="filter"
        ></b-input>
      </b-col>
      <b-col lg="2" class="text-right">
        <download-csv
          class= "btn btn-outline-secondary"
          :data= "updated_entries"
          name="time.csv">
          Download CSV
        </download-csv>
      </b-col>
      <b-col lg="2">
        <b-button v-b-modal.modal-time class="add-button">Add New Entry</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <b-table striped hover :filter="filter" :items="updated_entries" :fields="fields">
          <template v-slot:cell(client)="data">
            <b-link :href="`/#/client/${data.item.client_id}`">{{ data.item.client }}</b-link>
          </template>

          <template v-slot:cell(project_name)="data">
            <b-link :href="`/#/project/${data.item.project_id}`">{{ data.item.project_name }}</b-link>
          </template>

          <template v-slot:cell(project_job_code)="data">
            <b-link :href="`/#/project/${data.item.project_id}`">{{ data.item.project_job_code }}</b-link>
          </template>

        </b-table>
      </b-col>
    </b-row>

    <b-modal id="modal-time" ref="modal-time" centered>
      <template v-slot:modal-title>
        Add a Time Entry
      </template>
      <b-form>
        <b-form-group id="input-group-time_date" label="Date:" label-for="time_date">
          <b-form-datepicker id="time_date" v-model="date" class="mb-2"></b-form-datepicker> 
        </b-form-group>
        <b-form-group id="time_time_spent" label="Time Spent:" label-for="time_time_spent">
          <b-form-spinbutton id="time_time_spent" v-model="time_spent" min=".25" max="8" step=".25"></b-form-spinbutton>
        </b-form-group>
        <b-form-group id="time_note" label="Note:" label-for="time_note">
          <b-input
            id="time_note"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Enter note here..."
            v-model="note"
          ></b-input>
        </b-form-group>
        <b-form-group id="input-group-project_client" label="Client:" label-for="project_client">
          <b-form-select
            id="project_client"
            class="mb-2 mr-sm-2 mb-sm-0"
            :options="client_options"
            v-model="client"
            :value="null"
          ></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-project_client" label="Project:" label-for="project_client">
          <b-form-select
            id="project_client"
            class="mb-2 mr-sm-2 mb-sm-0"
            :options="project_options"
            v-model="project"
            :value="null"
          ></b-form-select>
        </b-form-group>
      </b-form>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="hideModal()">
          Cancel
        </b-button>
        <b-button variant="primary" @click="add()">Save</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>

import { uuid } from 'vue-idb'

export default {
  name: 'Time',
  data () {
    return {
      fields: [
        {
          key: 'client',
          label: 'Client',
          sortable: true
        },
        {
          key: 'project_name',
          label: 'Project Name',
          sortable: true
        },
        {
          key: 'project_job_code',
          label: 'Job Code',
          sortable: true
        },
        {
          key: 'date',
          label: 'Date',
          sortable: true
        },
        {
          key: 'time_spent',
          label: 'Time',
          sortable: true
        },
        {
          key: 'note',
          label: 'Note',
          sortable: true
        },
      ],
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
      filter: ''
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
      this.entries.forEach(function (value) {
        self.updated_entries.push({
          client_id: value.client,
          client: self.clients.filter(client => client.id == value.client)[0].name,
          project_name: self.projects.filter(project => project.id == value.project)[0].name,
          project_id: value.project,
          project_job_code: self.projects.filter(project => project.id == value.project)[0].job_code,
          date: value.date,
          time_spent:  value.time_spent,
          note: value.note
        })
      });
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
        project: this.project,
        submitted: this.submitted,
        reminder: this.reminder
      }).then(() => this.update())
    },
    remove (entry){
      this.$db.entries.where('id').equals(entry.id).delete().then(() => this.update())
    },
    hideModal() {
      this.$refs['modal-time'].hide()
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
<style>
.add-button {
  background-color: #05668D !important;
  border-color: #05668D !important;
  color: white !important;
}
.add-button:hover {
  background-color: #427AA1 !important;
  border-color: #427AA1 !important;
  color: white !important;
}
</style>