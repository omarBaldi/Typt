<template>
  <v-app-bar
      dark
      app
      flat
      class="pl-5 pr-5"
      id="Menu"
    >

      <v-row v-if="user">
        <v-btn text to="/dashboard" class="mr-10">
          Homepage
          <v-icon size="20" class="ml-2">mdi-home</v-icon>
        </v-btn>
        <v-toolbar-title>
          <h3 class="font-italic font-weight-light">Welcome back {{user.name}}.</h3>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text @click="logout">Logout</v-btn>
      </v-row>

      <v-row v-else>
        <v-btn text to="/">Type_application</v-btn>
        <v-spacer></v-spacer>
        <v-btn text to="/login" class="mr-3">Sign in</v-btn>
        <v-btn text to="/register">Sign up</v-btn>
      </v-row>

    </v-app-bar>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Menu',
  data() {
    return {
      user: null
    }
  },
  created() {
    if (localStorage.currentUser) {
      this.user = JSON.parse(localStorage.currentUser)
    }
  },
  watch: {
    user(newValue) {
      this.user = newValue;
    }
  },
  methods: {
    async logout() {

      try {
        await axios.get('/api/auth/logout');
        localStorage.removeItem('currentUser');
        this.$router.push('/login');
      } 
      catch(err) {
        console.log(`Error occuring during logging out: ${err}`);
      }

    }
  }
}
</script>

<style>
  #Menu {
    background-color: #2d3436;
    border-bottom: 1px solid #636e72; 
  }
</style>