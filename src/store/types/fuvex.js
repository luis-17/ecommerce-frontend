import namespace from '@/store/namespace';

export default namespace('fuvex', {
  getters: [
    'getInProcess',
    'getView',
    'getComingView',
    'getStepper',
    'getCurrentClienteId',
    'getCurrentSolicitudId',
  ],
  mutations: [
    'setRealView',
    'setTemporal',
    'setInProcess',
    'setView',
    'setComingView',
    'setVisibilityStepper',
    'setCurrentClienteId',
    'setCurrentSolicitudId',
  ],
  actions: [
    'startProcess',
    'closeProcess',
    'continueProcess',
    'changeView',
    'nextView',
    'showStepper',
    'closeStepper',
    'prevStepper',
    'nextStepper',
  ],
});
