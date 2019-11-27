import Vue from 'vue';
import Router from 'vue-router';

import Root from '@/views/Layout/Root.vue';

import Inicio from '@/views/Inicio.vue';
import Login from '@/views/Auth/Login.vue';

import RegistrarCuenta from '@/views/Auth/RegistrarCuenta.vue';
import RecuperarCuenta from '@/views/Auth/RecuperarCuenta.vue';


import { store } from '@/store';
import accountTypes from '@/store/types/account';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Root,
      meta: { Auth: false },
      async beforeEnter(to, from, next) {
        await store.dispatch(accountTypes.actions.logout);
        next();
      },
    },
    {
      path: '/registrar-cuenta',
      name: 'RegistrarCuenta',
      component: RegistrarCuenta,
      meta: { Auth: false },
      async beforeEnter(to, from, next) {
        await store.dispatch(accountTypes.actions.logout);
        next();
      },
    },
    {
      path: '/recuperar-cuenta/:tkn',
      name: 'RecuperarCuenta',
      component: RecuperarCuenta,
      meta: { Auth: false },
      async beforeEnter(to, from, next) {
        await store.dispatch(accountTypes.actions.logout);
        next();
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.Auth && !store.state.account.logged) {
    next({ name: 'Login '});
  } else {
    if (store.state.account.logged) {
      await store.dispatch(accountTypes.actions.setUser);
    }
    next();
  }
});

export default router;
