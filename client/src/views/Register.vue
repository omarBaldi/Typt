<template>
  <v-container fluid fill-height>
     <v-row class="justify-center align-center">
          <v-col cols="3">
            <v-card flat color="transparent">

              <v-card-title class="justify-center mb-12">
                <h1 class="white--text font-weight-light">Register.</h1>
              </v-card-title>

              <v-form 
                @submit="register" 
                ref="form"
                lazy-validation
                >

                <v-text-field
                  type="text"
                  v-model="name"
                  solo
                  placeholder="Name"
                  required
                  clearable
                  color="black"
                ></v-text-field>

                <v-text-field
                  type="email"
                  v-model="username"
                  solo
                  placeholder="Username"
                  required
                  clearable
                  color="black"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  solo
                  placeholder="Password"
                  required
                  color="black"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                ></v-text-field>

                <v-text-field
                  v-model="password2"
                  solo
                  placeholder="Repeat password"
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
                    Create account
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
  name: 'Register',
  data() {
    return {
      showPassword: false,
      name: null,
      username: null,
      password: null,
      password2: null
    }
  },
  methods: {
    async register(e) {
      e.preventDefault();

      const data = { 
        name: this.name, 
        username: this.username, 
        password: this.password, 
        password2: this.password2 
      };

      try {
        await axios.post('http://localhost:3000/api/auth/register', data);
        this.$router.push('/login');
      } catch(err) {
        console.log(`Something went wrong in the register method: ${err.message}`);
      }
    }
  }
}
</script>
