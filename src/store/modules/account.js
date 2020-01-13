import store from 'store2';
import injector from 'vue-inject';
import jwtDecode from 'jwt-decode';
import accountType from '@/store/types/account';
import notificationsTypes from '@/store/types/notifications';

const state = {
  status: '😶',
  user: {
    idusuario: null,
    idcliente: null,
    username: null,
    nombres: null,
    apellido_paterno: null,
    apellido_materno: null,
  },
  token: null,
  logged: store.has('TID'),
};

const getters = {
  [accountType.getters.getToken](state) {
    return state.token;
  },
  [accountType.getters.getUser](state) {
    return state.user;
  },
};

const mutations = {
  [accountType.mutations.loginRequest](state) {
    state.status = '⏳';
  },
  [accountType.mutations.loginSuccess](state, { user, token }) {
    state.status = '😃';
    state.user.idusuario = user.idusuario;
    state.user.idcliente = user.idcliente;
    state.user.username = user.username;
    state.user.nombres = user.nombres;
    state.user.apellido_paterno = user.apellido_paterno;
    state.user.apellido_materno = user.apellido_materno;
    // state.user.rol = user.rol;
    state.token = token;
    state.logged = true;
  },
  [accountType.mutations.loginFailure](state) {
    state.status = '😵';
  },
  [accountType.mutations.logout](state) {
    state.status = '😶';
    state.user.idusuario = null;
    state.user.idcliente = null;
    state.user.username = null;
    state.user.nombres = null;
    state.user.apellido_paterno = null;
    state.user.apellido_materno = null;
    // state.user.rol = null;
    state.token = null;
    state.logged = false;
  },
};

const actions = {
  [accountType.actions.setUser]: injector.encase(['axios'], axios => async ({ commit }) => {
    if (store.has('TID')) {
      const token = store.get('TID');
      const user = jwtDecode(token);
      commit(accountType.mutations.loginSuccess, { user, token });
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }),
  [accountType.actions.login]: injector.encase(['AccountService'], (AccountService) => async ({ dispatch, commit }, credentials) => {
    try {
      commit(accountType.mutations.loginRequest);
      const data = await AccountService.login(credentials);
      // console.log(data, 'vuex dataaa');
      const { token, flag } = data;
      const user = jwtDecode(token);
      // console.log(user, 'useeerrr');
      commit(accountType.mutations.loginSuccess, { user, token });




      // const { id: perfilId } = user.perfil;
      // let view = 'Login';
      // switch (perfilId) {
      //   case Roles.ADMIN:
      //     view = 'Admin/Home';
      //     break;
      //   case Roles.SUPERVISOR:
      //     view = 'Supervisor/Home';
      //     break;
      //   case Roles.ANALISTA:
      //     view = 'Analista/Home';
      //     break;
      //   default:
      //     // empty
      //     break;
      // }
      // console.log('view:::', view);
      // console.log(token, flag, 'token, flag vuex');
      return { token, flag };
    } catch (error) {
      if (error.status === 418) {
        return error.data.data;
      }
      // console.log(error.message, 'error.message de vuex');
      commit(accountType.mutations.loginFailure);
      await dispatch(notificationsTypes.actions.error, error);
      return { token: null, flag: 0, message: error.message };
    }
  }),
  [accountType.actions.logout]: injector.encase(['AccountService'], AccountService => async ({ commit }) => {
    await AccountService.logout();
    store.remove('TID');
    commit(accountType.mutations.logout);
  }),
  // [accountType.actions.keepAlive]: injector.encase(['AccountService'], AccountService => async () => {
  //   await AccountService.keepAlive();
  // }),
};

export default {
  state,
  getters,
  mutations,
  actions,
};
