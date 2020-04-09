/* eslint-disable */
<template>
  <div>
    <Row>
      <i-col span="8" offset="8">
        <Steps :current="0">
          <Step title="Clients"></Step>
          <Step title="Projects"></Step>
          <Step title="Confirmation"></Step>
        </Steps>
      </i-col>
    </Row>
    <Row>
        <i-col span="8" offset="8">Setup</i-col>
    </Row>
    <Row>
      <i-col span="8" offset="8">
        <Row v-if="step == 0">
          <i-col span="16">
            <i-input placeholder="Enter Client Name..." clearable v-model="new_client" :maxlength="50" />
          </i-col>
          <i-col span="6" offset="2">
            <i-button @click="add()">Add Client</i-button>  
          </i-col>
        </Row>
      </i-col>
    </Row>
    <h2>Client List</h2>
    <hr>
    <div>
      <ul>
        <li v-for="(client, index) in clients" :key="index">
          {{ client.name }} <button type="button" @click="remove(client)">&times;</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { uuid } from 'vue-idb'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
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
      console.log(this.new_client)
      this.$db.clients.add({ 
        id: uuid(), 
        name: this.new_client
      }).then(() => this.update())
    },
    remove (client){
      this.$db.clients.where('id').equals(client.id).delete().then(() => this.update())
    },
    nextStep () {
      this.step++;
    },
    previousStep () {
      this.step--;
    }
  }
}
</script>
