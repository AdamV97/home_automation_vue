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

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex);

logedin = false;
if(localStorage.getItem('logedin') === true){
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
