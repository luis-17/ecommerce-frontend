import Vue from 'vue';
import injector from 'vue-inject';
import VueLogger from 'vuejs-logger';
import VeeValidate, { Validator } from 'vee-validate';
import es from 'vee-validate/dist/locale/es';
import VueI18n from 'vue-i18n';
import VueI18nFilter from 'vue-i18n-filter';
import { abilitiesPlugin } from '@casl/vue';
import VueTheMask from 'vue-the-mask';
import VueWait from 'vue-wait';
import VueSweetalert2 from 'vue-sweetalert2';
import VueFilterDateParse from 'vue-filter-date-parse';
import VueFilterDateFormat from 'vue-filter-date-format';
import VueElementLoading from 'vue-element-loading';
import VueSimpleSpinner from 'vue-simple-spinner';
import VueCurrencyFilter from 'vue-currency-filter';
import InfiniteLoading from 'vue-infinite-loading';
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes';
import Vue2TouchEvents from 'vue2-touch-events';
import IdleVue from 'idle-vue';
import moment from 'moment-timezone';
import VTooltip from 'v-tooltip';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCloudUploadAlt,
  faCheckCircle,
  faInfoCircle,
  faQuestionCircle,
  faEdit,
  faPaste,
  faEye,
  faEyeSlash,
  faCalendarAlt,
  faAlignJustify,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Components
import './components';

import App from './App.vue';
import router from './router';
import { store, ability } from './store';
import messages from './translations';

const isProduction = process.env.NODE_ENV === 'production';

library.add(faCloudUploadAlt);
library.add(faCheckCircle);
library.add(faInfoCircle);
library.add(faQuestionCircle);
library.add(faEdit);
library.add(faPaste);
library.add(faEye);
library.add(faEyeSlash);
library.add(faCalendarAlt);
library.add(faAlignJustify);
library.add(faTrash);

require('bootstrap');
require('./inject');

Vue.use(injector);
Vue.use(VueLogger, {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  // showLogLevel: true,
  // showMethodName: true,
  // separator: '|',
  showConsoleColors: true,
});
Vue.use(VeeValidate, {
  // inject: true,
  // fieldsBagName: 'veeFields',
  // behavior: 'input|change|blur',
  events: 'change',
});
Vue.use(VueI18n);
Vue.use(VueI18nFilter);
Vue.use(abilitiesPlugin, ability);
Vue.use(VueTheMask);
Vue.use(VueWait);
Vue.use(VueSweetalert2);
Vue.use(VueFilterDateParse);
Vue.use(VueFilterDateFormat);
Vue.use(VueCurrencyFilter, {
  symbol: 'S/',
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true,
});
Vue.use(InfiniteLoading, { /* options */ });
Vue.use(vueFilterPrettyBytes);
Vue.use(Vue2TouchEvents);

Vue.use(VTooltip);

const eventsHub = new Vue();
Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 60000 * 15,
});

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('VueElementLoading', VueElementLoading);
Vue.component('VueSimpleSpinner', VueSimpleSpinner);

Validator.localize('es', es);
moment.locale('es');

const i18n = new VueI18n({
  locale: 'es',
  messages,
});

//
const alphanumSpaces = /^[0-9A-ZÁÉÍÑÓÚÜ\s]*$/i;
Validator.extend('alphanum_spaces', {
  getMessage: field => `El campo ${field} solo debe contener letras, n\u00FAmeros y espacios`,
  validate: value => alphanumSpaces.test(value),
});

Validator.extend('antiguedad_laboral', {
  getMessage: field => `El campo ${field} debe ser mayor 6 meses`,
  validate: value => moment().diff(moment(value, 'YYYY-MM-DD'), 'months', true) > 6,
});

const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"); // eslint-disable-line
Validator.extend('verify_password', {
  getMessage: () => 'La contrase\u00F1a debe contener al menos: 1 letra may\u00FAscula, 1 letra min\u00FAscula, 1 n\u00FAmero y un car\u00E1cter especial.',
  validate: value => strongRegex.test(value),
});

Vue.filter('fecha_sequelize', value => (value ? moment(value).format('YYYY-MM-DD') : ''));
Vue.filter('decimal_2', value => (value ? value.toFixed(2) : ''));
Vue.filter('timeAGo', value => (value ? moment(value).fromNow() : ''));
Vue.filter('rmSymbol', (value = '') => value.replace('S/ ', ''));
// toFixed

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  wait: new VueWait({
    useVuex: true,
    vuexModuleName: 'wait',
  }),
  render: h => h(App),
}).$mount('#app');
