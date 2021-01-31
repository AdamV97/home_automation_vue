<template>
<v-card>
  <v-app-bar color="teal" dark>
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Home Automation</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary style="position: fixed">
      <v-list nav dense>

        <v-list-item-group v-model="group" active-class="teal--text text--accent-4">

          <div v-if="loggedIn == false">
            <v-list-item v-for="item in items.generalNavigation" :key="item.title" :to="item.route">
              <v-list-item-icon>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item>
          </div>

          <div v-if="loggedIn == true">
            <v-list-item v-for="item in items.logedInNavigation" :key="item.title" :to="item.route">
              <v-list-item-icon>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>


const navigation = {
  generalNavigation:[
    {title: 'Home', route: '/home', icon: 'mdi-home'},
    {title: 'Sign in', route: '/signin', icon: 'mdi-account'},
  ],
  logedInNavigation:[
    {title: 'Home', route: '/home', icon: 'mdi-home'},
    // {title: 'All Data', route: '/allData', icon: 'mdi-format-list-checkbox'},
    {title: 'Devices status', route: '/deviceStatus', icon: 'mdi-leak'},
    {title: 'Sign out', route: '/signOut', icon: 'mdi-logout'},
  ]
}

export default {
  name: "Navigation",
  data(){
    return {
      drawer: false,
      group: null,
      items: navigation
    }
  },
  computed: {
    loggedIn(){
      return  this.$store.state.authenticated
    }
  }
};
</script>
<style>

</style>
