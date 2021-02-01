<template>
  <v-container fluid class="main-signin">
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                v-model="input.email"
                name="email"
                label="Email"
                id="email"
                type="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="input.password"
                name="password"
                label="Password"
                id="password"
                type="password"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="teal" @click="login">Sign In</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from "axios";
  import json from '../../api.json'

  export default {
    name: 'SignIn',
    data() {
      return {
        input: {
          email: "",
          password: ""
        }
      }
    },
    methods: {
      login: function() {
        axios({ method: "POST", "url": json.api_root + "login", "data": this.input, "headers": { "content-type": "application/json" } }).then(result => {
            this.response = result.data;
            if(result.data.logedin){
              localStorage.setItem('access_token', result.data.access_token);
              localStorage.setItem('logedin', true);
              this.$store.commit("setAuthentication", true);
              this.$router.replace({ name: "home" });
            }
        }, error => {
            console.error(error);
        });
      },
    }
  }
</script>

<style>
  .main-signin{
    width: 70%;
  }
</style>