import startOfDay from 'date-fns/start_of_day';
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
