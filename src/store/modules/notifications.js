import notificationsTypes from '@/store/types/notifications';

let counter = 0;

const state = {
  stack: [],
};

const getters = {
  [notificationsTypes.getters.getStack](state) {
    return state.stack;
  },
};

const mutations = {
  [notificationsTypes.mutations.add](state, message) {
    message.id = message.id || ++counter;
    state.stack.push(message);
  },
  [notificationsTypes.mutations.remove](state, message) {
    state.sack = state.stack.filter(m => m !== message);
  },
};

const actions = {
  [notificationsTypes.actions.info]({ commit }, message) {
    commit(notificationsTypes.mutations.add, {
      timeout: 3000,
      type: 'info',
      message,
    });
  },
  [notificationsTypes.actions.error]({ commit }, error) {
    commit(notificationsTypes.mutations.add, {
      timeout: 3000,
      type: error.type,
      message: error.message,
    });
  },
  [notificationsTypes.actions.remove]({ commit }, message) {
    commit(notificationsTypes.mutations.remove, message);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
