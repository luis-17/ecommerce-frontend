import namespace from '@/store/namespace';

export default namespace('account', {
  getters: [
    'getToken',
    'getUser',
  ],
  mutations: [
    'loginRequest',
    'loginSuccess',
    'loginFailure',
    'logout',
  ],
  actions: [
    'setUser',
    'login',
    'logout',
    'keepAlive',
  ],
});
