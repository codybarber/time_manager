/* eslint-disable */
<template>
  <div class="container-fluid">
    <b-modal id="modal-project" ref="modal-project" centered>
      <template v-slot:modal-title>
        Add a New Project
      </template>
      <b-form>
        <b-form-group id="input-group-project_name" label="Project Name:" label-for="project_name">
          <b-input
            id="project_name"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Enter name here..."
            v-model="project_name"
          ></b-input>
        </b-form-group>
        <b-form-group id="input-group-project_jobcode" label="Job Code:" label-for="project_jobcode">
          <b-input
            id="project_jobcode"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Enter code here..."
            v-model="project_jobcode"
          ></b-input>
        </b-form-group>
        <b-form-group id="input-group-project_client" label="Client:" label-for="project_client">
          <b-form-select
            id="project_client"
            class="mb-2 mr-sm-2 mb-sm-0"
            :options="client_options"
            v-model="project_client"
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
    <b-row class="sub-header-row">
      <b-col lg="5">
        <span class="sub-header">Projects</span>
      </b-col>
      <b-col lg="3">
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
          :data= "updated_projects"
          name="projects.csv">
          Download CSV
        </download-csv>
      </b-col>
      <b-col lg="2">
        <b-button v-b-modal.modal-project class="add-button">Add New Project</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <b-table striped hover :filter="filter" :items="updated_projects" :fields="fields">
          <template v-slot:cell(client)="data">
            <b-link :href="`/#/client/${data.item.client_id}`">{{ data.item.client }}</b-link>
          </template>
          <template v-slot:cell(name)="data">
            <b-link :href="`/#/project/${data.item.id}`">{{ data.item.name }}</b-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { uuid } from 'vue-idb'

export default {
  name: 'Project',
  data () {
    return {
      step: 0,
      clients: [],
      client_options: [],
      projects: [],
      updated_projects: [],
      project_name: null,
      project_client: null,
      project_jobcode: null,
      fields: [
        {
          key: 'client',
          label: 'Client',
          sortable: true
        },
        {
          key: 'name',
          label: 'Project Name',
          sortable: true
        },
        {
          key: 'job_code',
          label: 'Job Code',
          sortable: true
        },
      ],
      filter: ''
    }
  },
  mounted () {
    this.getClients();
    this.update()
  },
  watch: {
    clients () {
      for (let i = 0; i < this.clients.length; i++) {
        this.client_options.push({value: this.clients[i].id, text: this.clients[i].name})
      }
    },
    projects () {
      this.updated_projects = [];
      let self = this;
      this.projects.forEach(function (value) {
        self.updated_projects.push({
          client_id: value.client,
          client: self.clients.filter(client => client.id == value.client)[0].name,
          id: value.id,
          name: value.name,
          job_code: value.job_code
        })
      });
    }
  },
  methods: {
    getClients(){
      this.$db.clients.toArray().then( clients => this.clients = clients )
    },
    update(){
      this.$db.projects.toArray().then( projects => this.projects = projects )
      this.hideModal();
    },
    add (){
      this.$db.projects.add({ 
        id: uuid(), 
        name: this.project_name,
        job_code: this.project_jobcode,
        client: this.project_client
      }).then(() => this.update())
    },
    remove (project){
      this.$db.projects.where('id').equals(project.id).delete().then(() => this.update())
    },
    hideModal() {
      this.$refs['modal-project'].hide()
    },
  }
}
</script>

<style>
.sub-header-row {
  margin: 10px 0 10px 0;
}

.sub-header {
  font-size: 2rem;;
}

i:hover {
  color: #F15025;
}

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
