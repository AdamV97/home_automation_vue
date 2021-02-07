import Vue from 'vue'
import Vuex from "vuex"
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import SignIn from './views/SignIn.vue'
import deviceStatus from './components/DeviceStatus.vue'
import Notifications from 'vue-notification'
import axios from "axios";
import json from '../api.json'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Notifications);

logedin = false;
if(localStorage.getItem('logedin') === 'true'){
  var logedin = true;
}

const store = new Vuex.Store(
  {
      state: {
          authenticated: logedin
      },
      mutations: {
          setAuthentication(state, status) {
              state.authenticated = status;
          }
      }
  }
);

const router = new VueRouter({ 
  routes: [
    {
      path: '/',
      redirect: {
          name: "home"
      }
    },{
      path: '/home',
      name: 'home',
      component: Home
    },{
      path: '/signin',
      name: 'signIn',
      component: SignIn
    },{
      path: '/deviceStatus',
      name: "deviceStatus",
      component: deviceStatus,
      beforeEnter: (to, from, next) => {
          if(store.state.authenticated === false) {
            next({ path: '/home' })
          } else {
            next();
          }
      }
    },{
      path: '/signOut',
      name: "signOut",
      beforeEnter: (to, from, next) => {
        let access_token =  localStorage.getItem('access_token');

        axios({ method: "GET", "url": json.api_root + "logout", "headers": { "content-type": "application/json", 'Authorization': 'Bearer ' + access_token}}).then(result => {
          if(!result.data.logedin){
            Vue.notify({
              group: 'bottom-notification',
              title: 'Success!',
              type: 'success ',
              text: 'Signed out!'
            });
          }
        });

        store.commit("setAuthentication", false);
        localStorage.setItem('access_token', '');
        localStorage.setItem('logedin', false);

        next({ path: '/home' });
      }
    }
  ],
  mode: 'history'
});


new Vue({
  vuetify,
  render: h => h(App),
  router,
  store: store
}).$mount('#app')
