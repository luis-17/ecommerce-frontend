import ServerError from '@/common/ServerError';

class AccountService {
  constructor(axios) {
    this.axios = axios;
  }

  async login(credentials) {
    try {
      const { data: { token }, data } = await this.axios.post('login', credentials);
      console.log(data, 'dataaaaaaa services');
      this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      return data;
    } catch (error) {
      this.axios.defaults.headers.common.Authorization = null;
      throw new ServerError(error);
    }
  }

  async lostpass(params) {
    try {
      await this.axios.post('lostpass', params);
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async actualizarClave(params) {
    try {
      const { data } = await this.axios.post('actualizaPassword', params);
      return data;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async registrarCuenta(params) {
    try {
      const { data } = await this.axios.post('registro', params);
      return data;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async logout() {
    try {
      // if (this.axios.defaults.headers.common.Authorization) {
      //   await this.axios.post('logout');
      // }
      this.axios.defaults.headers.common.Authorization = null;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async keepAlive() {
    try {
      await this.axios.post('keep-alive');
    } catch (error) {
      throw new ServerError(error);
    }
  }
}

export default AccountService;
