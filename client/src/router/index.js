import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../views/Homepage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/game/:difficulty',
    name: 'Game',
    component: Game,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  //TODO: Check if path is in routes (if not redirect to either login or dashboard)

  if (requiresAuth && !currentUser) return next('login');
  if ((!requiresAuth && currentUser)) return next('dashboard');
  return next();
});

export default router
