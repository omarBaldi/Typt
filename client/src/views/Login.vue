<template>
  <v-container fluid fill-height id="containerLogin">
     <v-row class="justify-center align-center text-center">
          <v-col cols="3">
            <v-card flat color="transparent">

              <v-card-title class="justify-center mb-12"><h1 class="white--text font-weight-light">Login.</h1></v-card-title>

              <v-form 
                @submit="login" 
                ref="form"
                lazy-validation
                >

                <v-text-field
                  type="email"
                  v-model="username"
                  placeholder="Username"
                  solo
                  required
                  clearable
                  color="black"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  placeholder="Password"
                  solo
                  required
                  color="black"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                ></v-text-field>

                <v-btn
                  block
                  large
                  rounded
                  type="submit"
                  color="white black--text"
                  class="mt-5"
                  >
                    Login
                </v-btn>

              </v-form>

            </v-card>
          </v-col>
        </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      showPassword: false,
      username: null,
      password: null
    }
  },
  methods: {
    async login(e) {

      e.preventDefault();

      const data = { username: this.username, password: this.password };

      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', data);
        const { _id, name, isAdmin } = response.data.currentUser;
        console.log("Authenticated")
      } catch(err) {
        console.log(`Something went wrong in the login post method: ${err}`);
      }

    }
  }
}
</script>
