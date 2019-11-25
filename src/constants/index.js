import injector from 'vue-inject';
import axios from 'axios';
import SolicitudStates from './SolicitudStates';
import Roles from './Roles';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = `${process.env.API_URL}`;

injector.constant('axios', axiosInstance);
injector.constant('apiUrl', `${process.env.API_URL}`);
injector.constant('SolicitudStates', SolicitudStates);
injector.constant('Roles', Roles);
injector.constant('reCAPTCHA_SITE_KEY', `${process.env.reCAPTCHA_SITE_KEY}`);
injector.constant('KEEP_ALIVE', `${process.env.KEEP_ALIVE}`);
