<template>
  <div id="app">
    <b-navbar toggleable="lg" class="navbar" type="dark">
      <b-navbar-brand href="/#/" class="brand">
        Hot Minute
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/#/time" :class="$route.path.indexOf('time') > -1 ? 'active-nav' : ''">Time</b-nav-item>
          <b-nav-item href="/#/client" :class="$route.path.indexOf('client') > -1 ? 'active-nav' : ''">Clients</b-nav-item>
          <b-nav-item href="/#/project" :class="$route.path.indexOf('project') > -1 ? 'active-nav' : ''">Projects</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background-color: #F6F7EB;
  height: 100vh;
}

.navbar {
  background-color: #05668D !important;
  color: white !important;
}

.brand {
  color: white !important;
}

.nav-link {
  color: white !important;
  padding: 5px !important;
}

.nav-link:hover {
  color: #F6F7EB !important;
  padding: 5px !important;
}

.active-nav {
  color: #F7F9F9 !important;
  border-bottom: .5px solid #F7F9F9;
  border-bottom-width: thin;
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

a {
  color: #05668D !important;
}
</style>
