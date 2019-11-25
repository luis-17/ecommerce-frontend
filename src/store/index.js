import Vue from 'vue';
import Vuex from 'vuex';
import { abilityPlugin, ability as appAbility } from './ability';

import $global from './modules/global';
import notifications from './modules/notifications';
import account from './modules/account';
import fuvex from './modules/fuvex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const ability = appAbility;

export const store = new Vuex.Store({
  plugins: [
    abilityPlugin,
  ],
  modules: {
    $global,
    notifications,
    account,
    fuvex,
  },
  strict: debug,
});
