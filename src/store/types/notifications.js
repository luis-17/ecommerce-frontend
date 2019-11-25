import namespace from '@/store/namespace';

export default namespace('notifications', {
  getters: [
    'getStack',
  ],
  mutations: [
    'add',
    'remove',
  ],
  actions: [
    'info',
    'error',
    'remove',
  ],
});
