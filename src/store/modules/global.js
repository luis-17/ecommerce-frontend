import startOfDay from 'date-fns/startOfDay';
import globalTypes from '@/store/types/global';

const state = {
  now: new Date(),
};

const getters = {
  [globalTypes.getters.getToday](state) {
    return startOfDay(state.now);
  },
};

const mutations = {
};

const actions = {
};

export default {
  state,
  getters,
  mutations,
  actions,
};
