import Vue from 'vue';
import Router from 'vue-router';

import Root from '@/views/Layout/Root.vue';

import Inicio from '@/views/Inicio.vue';
import Login from '@/views/Auth/Login.vue';

import RegistrarCuenta from '@/views/Auth/RegistrarCuenta.vue';
import RecuperarCuenta from '@/views/Auth/RecuperarCuenta.vue';
import ValidarCuenta from '@/views/Auth/ValidarCuenta.vue';

// start: In
import InRoot from '@/views/In/InRoot.vue';
import Home from '@/views/In/Home.vue';
import AgendarCita from '@/views/In/AgendarCita.vue';
import HistorialCitas from '@/views/In/HistorialCitas.vue';
import PerfilPaciente from '@/views/In/PerfilPaciente.vue';
// end: In

import { store } from '@/store';
import accountTypes from '@/store/types/account';

Vue.use(Router);

const router = new Router({
  // linkActiveClass: 'active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio,
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
    {
      path: '/validar-cuenta/:tkn',
      name: 'ValidarCuenta',
      component: ValidarCuenta,
      meta: { Auth: false },
      async beforeEnter(to, from, next) {
        await store.dispatch(accountTypes.actions.logout);
        next();
      },
    },
    {
      path: '/in',
      component: InRoot,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
          meta: { Auth: true },
        },
        {
          path: 'agendar-cita',
          name: 'AgendarCita',
          component: AgendarCita,
          meta: { Auth: true },
        },
        {
          path: 'historial-citas',
          name: 'HistorialCitas',
          component: HistorialCitas,
          meta: { Auth: true },
        },
        {
          path: 'perfil-de-paciente',
          name: 'PerfilPaciente',
          component: PerfilPaciente,
          props: true,
          meta: { Auth: true },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.Auth && !store.state.account.logged) {
    next({ name: 'Inicio'});
    // this.$router.push({ name: "Inicio" });
  } else {
    if (store.state.account.logged) {
      await store.dispatch(accountTypes.actions.setUser);
    }
    next();
  }
});

export default router;
