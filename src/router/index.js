import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main';
import SignIn from '@/views/SignIn';
import MyList from '@/views/MyList';
import Film from '@/views/Film';
import AddReview from '@/views/AddReview';
import Player from '@/views/Player';
import store from '@/store/modules/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/login',
    name: 'login',
    component: SignIn,
  },
  {
    path: '/mylist',
    name: 'mylist',
    component: MyList,
  },
  {
    path: '/films/:id',
    name: 'film',
    component: Film,
  },
  {
    path: '/films/:id/review',
    name: 'add-review',
    component: AddReview,
  },
  {
    path: '/player/:id',
    name: 'player',
    component: Player,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(store);
  if (to.name == 'add-review' && !store.state.isLoggedIn) next({name: 'login'});
  else next();
});
export default router;
