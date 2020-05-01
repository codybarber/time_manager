/* eslint-disable */
<template>
  <div class="container-fluid">      
    <b-row class="sub-header-row">
      <b-col lg="10">
        <span class="sub-header">Clients</span>
      </b-col>
      <b-col lg="2">
        <b-button v-b-modal.modal-client class="add-button">Add New Client</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="3" md="6" sm="12" v-for="(client, index) in clients" :key="index">
        <b-link :href="`/#/client/${client.id}`" class="card-link">
          <b-card :title="client.name">
            <hr>
            <span class="pull-right">
              <b-btn variant="secondary-outline" @click="remove(client)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </b-btn>
              <b-btn variant="secondary-outline" @click="edit(client)">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </b-btn>
            </span>
          </b-card>
        </b-link>
      </b-col>
    </b-row>

     <b-modal id="modal-client" ref="modal-client" centered>
      <template v-slot:modal-title>
        Add a New Client
      </template>
      <b-form>
        <b-input-group prepend="Client Name" class="mt-3">
          <b-form-input v-model="new_client"></b-form-input>
          <b-input-group-append>
            <b-button variant="info" @click="add()">Submit</b-button>
          </b-input-group-append>
        </b-input-group>
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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Client',
  data () {
    return {
      step: 0,
      clients: [],
      new_client: ''
    }
  },
  mounted () {
    this.update()
  },
  methods: {
    update(){
      this.$db.clients.toArray().then( clients => this.clients = clients )
    },
    add (){
      this.$db.clients.add({ 
        id: uuid(), 
        name: this.new_client
      }).then(() => this.update())
    },
    remove (client){
      this.$db.clients.where('id').equals(client.id).delete().then(() => this.update())
    },
    hideModal() {
      this.$refs['modal-project'].hide()
    },
  }
}
</script>
<style>
.card-link {
  color: black;
}
.card-link:hover {
  color: #05668D;
}

.add-button {
  background-color: #05668D !important;
  border-color: #427AA1 !important;
  color: white !important;
}
.add-button:hover {
  background-color: #427AA1 !important;
  border-color: #427AA1 !important;
  color: white !important;
}
</style>