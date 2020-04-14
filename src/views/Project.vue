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
      <b-col lg="10">
        <span class="sub-header">Projects</span>
      </b-col>
      <b-col lg="2">
        <b-button v-b-modal.modal-project class="add-button">Add New Project</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="3" md="6" sm="12" v-for="(project, index) in projects" :key="index">
        <b-card :sub-title="project.name">
          <hr>
          <b-card-text>
            <b>Job Code:</b> {{ project.job_code }}<br>
            <b>Client:</b> {{ clients.filter(client => client.id == project.client)[0].name }}
          </b-card-text>
          <span class="pull-right">
            <b-btn variant="secondary-outline" @click="remove(project)">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </b-btn>
            <b-btn variant="secondary-outline" @click="edit(project)">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </b-btn>
          </span>
        </b-card>
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
      project_name: null,
      project_client: null,
      project_jobcode: null
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
  background-color: #CED0CE !important;
  border-color: #CED0CE !important;
  color: #191919 !important;
}

.add-button:hover {
  color: #F15025 !important;
}
</style>
