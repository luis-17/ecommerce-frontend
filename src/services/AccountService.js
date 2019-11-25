import ServerError from '@/common/ServerError';

class AccountService {
  constructor(axios) {
    this.axios = axios;
  }

  async login(credentials) {
    try {
      const { data: { data: token } } = await this.axios.post('users/login', credentials);
      this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      return token;
    } catch (error) {
      this.axios.defaults.headers.common.Authorization = null;
      throw new ServerError(error);
    }
  }

  async lostpass(params) {
    try {
      await this.axios.post('users/lostpass', params);
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async resetpass(params) {
    try {
      await this.axios.post('users/resetpass', params);
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async logout() {
    try {
      if (this.axios.defaults.headers.common.Authorization) {
        await this.axios.post('users/logout');
      }
      this.axios.defaults.headers.common.Authorization = null;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async keepAlive() {
    try {
      await this.axios.post('users/keep-alive');
    } catch (error) {
      throw new ServerError(error);
    }
  }
}

export default AccountService;
