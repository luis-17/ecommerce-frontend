class ServerError extends Error {
  constructor(error) {
    if (error.response) {
      if (error.response.data) {
        super(error.response.data.message);
        this.data = error.response.data;
      } else {
        super(error.message);
      }
      this.status = error.response.status;
    } else {
      super(error.message);
      this.status = 500;
    }
    this.name = this.constructor.name;
    this.type = `${this.status}`.startsWith('4') ? 'warning' : 'error';
  }
}

export default ServerError;
