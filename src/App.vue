<template>
  <div id="app">
    <b-navbar toggleable="lg" class="navbar" type="dark">
      <b-navbar-brand href="/#/" class="brand">
        Hot Minute
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/#/time">Time</b-nav-item>
          <b-nav-item href="/#/client">Clients</b-nav-item>
          <b-nav-item href="/#/project">Projects</b-nav-item>
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
}

.navbar {
  background-color: #191919 !important;
  color: white !important;
}

.brand {
  color: #F15025 !important;
}
</style>
