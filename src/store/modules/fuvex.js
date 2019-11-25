import fuvexTypes from '@/store/types/fuvex';
import Navigation from '@/common/Navigation';
import steppers from '@/data/steppers.json';

const navigation = new Navigation(steppers);

const state = {
  inProcess: false,
  view: null,
  comingView: null,
  stepper: {
    show: false,
    title: null,
    items: [],
    numItemsByLine: -1,
    currentStep: -1,
  },
  currentClienteId: null,
  currentSolicitudId: null,
  realView: null,
  temporal: false,
};

const getters = {
  [fuvexTypes.getters.getInProcess](state) {
    return state.inProcess;
  },
  [fuvexTypes.getters.getView](state) {
    return state.view;
  },
  [fuvexTypes.getters.getComingView](state) {
    console.log(state, 'state');
    return state.comingView;
  },
  [fuvexTypes.getters.getStepper](state) {
    return state.stepper;
  },
  [fuvexTypes.getters.getCurrentClienteId](state) {
    return state.currentClienteId;
  },
  [fuvexTypes.getters.getCurrentSolicitudId](state) {
    return state.currentSolicitudId;
  },
};

const mutations = {
  [fuvexTypes.mutations.setRealView](state, view) {
    state.realView = view;
  },
  [fuvexTypes.mutations.setTemporal](state, temporal) {
    state.temporal = temporal;
  },
  [fuvexTypes.mutations.setInProcess](state, inProcess) {
    state.inProcess = inProcess;
  },
  [fuvexTypes.mutations.setView](state, objView) {
    if (objView === null) {
      state.view = null;
      state.stepper.show = null;
      state.stepper.title = null;
      state.stepper.items = null;
      state.stepper.numItemsByLine = null;
      state.stepper.currentStep = null;
    } else {
      const { group, page } = objView;
      state.view = page.view;
      // state.stepper.show = !page.skeep;
      state.stepper.show = null;
      state.stepper.title = group.title;
      state.stepper.items = group.pages;
      state.stepper.numItemsByLine = group.numItemsByLine;
      state.stepper.currentStep = page.index;
    }
  },
  [fuvexTypes.mutations.setComingView](state, objCommingView) {
    console.log(state, objCommingView, 'state, objCommingViewgh');
    if (objCommingView === null) {
      state.comingView = null;
    } else {
      const { page = { view: undefined } } = objCommingView;
      state.comingView = page.view;
    }
  },
  [fuvexTypes.mutations.setVisibilityStepper](state, visibility) {
    // state.stepper.show = visibility;
    state.stepper.show = null;
  },
  [fuvexTypes.mutations.setCurrentClienteId](state, clienteId) {
    state.currentClienteId = clienteId;
  },
  [fuvexTypes.mutations.setCurrentSolicitudId](state, solicitudId) {
    state.currentSolicitudId = solicitudId;
  },
};

const actions = {
  [fuvexTypes.actions.startProcess]({ commit }) {
    commit(fuvexTypes.mutations.setInProcess, true);
    commit(fuvexTypes.mutations.setCurrentClienteId, null);
    commit(fuvexTypes.mutations.setCurrentSolicitudId, null);
    commit(fuvexTypes.mutations.setView, navigation.rewind());
    commit(fuvexTypes.mutations.setComingView, navigation.coming());
    commit(fuvexTypes.mutations.setRealView, navigation.current().page.view);
    commit(fuvexTypes.mutations.setTemporal, false);
  },
  [fuvexTypes.actions.closeProcess]({ commit }) {
    commit(fuvexTypes.mutations.setInProcess, false);
    commit(fuvexTypes.mutations.setCurrentClienteId, null);
    commit(fuvexTypes.mutations.setCurrentSolicitudId, null);
    commit(fuvexTypes.mutations.setView, null);
    commit(fuvexTypes.mutations.setComingView, null);
    commit(fuvexTypes.mutations.setVisibilityStepper, false);
    commit(fuvexTypes.mutations.setTemporal, false);
  },
  async [fuvexTypes.actions.continueProcess]({ dispatch, commit }, { clienteId, solicitudId, view }) {
    commit(fuvexTypes.mutations.setInProcess, true);
    commit(fuvexTypes.mutations.setCurrentClienteId, clienteId);
    commit(fuvexTypes.mutations.setCurrentSolicitudId, solicitudId);
    await dispatch(fuvexTypes.actions.changeView, view);
    commit(fuvexTypes.mutations.setRealView, navigation.current().page.view);
    commit(fuvexTypes.mutations.setTemporal, false);
  },
  [fuvexTypes.actions.changeView]({ commit }, view) {
    commit(fuvexTypes.mutations.setView, navigation.goToView(view));
    commit(fuvexTypes.mutations.setComingView, navigation.coming());
    commit(fuvexTypes.mutations.setRealView, navigation.current().page.view);
    commit(fuvexTypes.mutations.setTemporal, false);
  },
  [fuvexTypes.actions.nextView]({ commit }) {
    commit(fuvexTypes.mutations.setView, navigation.next());
    commit(fuvexTypes.mutations.setComingView, navigation.coming());
    commit(fuvexTypes.mutations.setRealView, navigation.current().page.view);
    commit(fuvexTypes.mutations.setTemporal, false);
  },
  [fuvexTypes.actions.showStepper]({ commit }) {
    commit(fuvexTypes.mutations.setVisibilityStepper, true);
  },
  [fuvexTypes.actions.closeStepper]({ commit }) {
    commit(fuvexTypes.mutations.setVisibilityStepper, false);
  },
  [fuvexTypes.actions.prevStepper]({ commit }) {
    if (navigation.current().group.index > 0) {
      commit(fuvexTypes.mutations.setTemporal, true);
      commit(fuvexTypes.mutations.setView, navigation.goToView('ResumenRegistro'));
      commit(fuvexTypes.mutations.setVisibilityStepper, true);
    }
  },
  [fuvexTypes.actions.nextStepper]({ commit, state }) {
    if (navigation.current().group.index < steppers.length) {
      commit(fuvexTypes.mutations.setTemporal, true);
      commit(fuvexTypes.mutations.setView, navigation.goToView(state.realView));
      commit(fuvexTypes.mutations.setVisibilityStepper, true);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
