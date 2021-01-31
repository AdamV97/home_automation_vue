// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import SignIn from '../views/SignIn.vue'
// import Secure from '../components/SecuredComponent.vue'

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     redirect: {
//         name: "home"
//     }
//   },{
//     path: '/home',
//     name: 'home',
//     component: Home
//   },{
//     path: '/signin',
//     name: 'signIn',
//     component: SignIn
//   },{
//     path: '/secure',
//     name: "secure",
//     component: Secure,
//     beforeEnter: (to, from, next) => {
//         if(this.$store.state.authenticated == false) {
//             next(false);
//         } else {
//             next();
//         }
//     }
// }
//   // {
//   //   path: '/about',
//   //   name: 'About',
//   //   // route level code-splitting
//   //   // this generates a separate chunk (about.[hash].js) for this route
//   //   // which is lazy-loaded when the route is visited.
//   //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   // }
// ]

// const router = new VueRouter({
//   routes,
//   mode: 'history'
// })

// export default router
