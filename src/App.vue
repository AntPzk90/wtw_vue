<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name: 'main'}">main</router-link>
      <router-link :to="{name: 'login'}">login</router-link>
      <router-link :to="{name: 'mylist'}">mylist</router-link>
      <router-link :to="{name: 'film'}">film</router-link>
      <router-link :to="{name: 'add-review'}">add review</router-link>
      <router-link :to="{name: 'player'}">player</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
//import axios from 'axios';

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('getFilmsAction', {apiUrl: '/films'});
    this.$store.dispatch('getUserDataFromLocalStorage', {key: 'userData'});
    this.$store.dispatch('autorizationUserCheck');
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 20px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
