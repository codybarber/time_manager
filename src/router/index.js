import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Time from '../views/Time.vue'
import Client from '../views/Client.vue'
import Project from '../views/Project.vue'
import SingleProject from '../views/SingleProject.vue'
import SingleClient from '../views/SingleClient.vue'

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/time',
    name: 'Time',
    component: Time
  },
  {
    path: '/client',
    name: 'Client',
    component: Client
  },
  {
    path: '/project',
    name: 'Project',
    component: Project
  },
  { 
    path: '/client/:id', 
    component: SingleClient 
  },
  { 
    path: '/project/:id', 
    component: SingleProject 
  }
]

const router = new VueRouter({
  routes
})

export default router
