<template>
  <v-app id="app">
    <Menu />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Menu from './components/Menu';

export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  background-color: #2d3436;
  color: #ffffff;
}
</style>

