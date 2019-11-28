import Vue from 'vue';
import awsEndpoint from '@/common/awsEndpoint';
import { ServerError } from '@/common/util';

// function getFilePathExtension(path) {
//   const filename = path.split('\\').pop().split('/').pop();
//   return filename.substr((Math.max(0, filename.lastIndexOf('.')) || Infinity) + 1);
// }

class GenericService {
  constructor(axios, apiUrl) {
    this.axios = axios;
    this.apiUrl = apiUrl;
  }

  async goBack(params) {
    Vue.$log.debug('XHR -> goBack', params);
    try {
      const { data: { data } } = await this.axios.post('goBack', params);
      Vue.$log.debug('response -> goBack', data);
      return data;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async show({ uri, params = {} }) {
    Vue.$log.debug('XHR -> show', uri, params);
    try {
      const { data } = await this.axios.get(uri, { params });
      Vue.$log.debug('response -> show', data);
      return data;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async store({ uri, data }) {
    Vue.$log.debug('XHR -> store', uri, data);
    try {
      const { data: $data } = await this.axios.post(uri, data);
      Vue.$log.debug('response -> data', $data);
      return $data;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async storeClean({ uri, data }) {
    Vue.$log.debug('XHR -> store', uri, data);
    try {
      const { data: $data } = await this.axios.post(uri, data);
      Vue.$log.debug('response -> data', $data);
      return $data;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async storeWithToken({ uri, data }) {
    Vue.$log.debug('XHR -> store', uri, data);
    try {
      const { data: $data } = await this.axios.post(uri, data);
      this.axios.defaults.headers.common.Authorization = `Bearer ${$data.token}`;
      Vue.$log.debug('response -> data', $data);
      return $data;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async remove(uri) {
    Vue.$log.debug('XHR -> delete', uri);
    try {
      const { data: { data } } = await this.axios.delete(uri);
      Vue.$log.debug('response -> delete', data);
      return data;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async upload({ uri1, uri2, file }) {
    console.log(uri1, uri2, file, 'uri1, uri2, fileuri1, uri2, file');
    Vue.$log.debug('XHR -> upload', uri1, uri2, file);
    try {
      // const fileExtension = getFilePathExtension(file.name).toUpperCase();
      // let response;
      // if (fileExtension === 'PDF') {
      const response = await awsEndpoint.sendFile(file, {
        signingURL: `${this.apiUrl}/${uri1}?name=${file.name}&type=${file.type}`,
        headers: {
          Authorization: this.axios.defaults.headers.common['Authorization'],
        },
      });
      // } else {
      //   const formData = new FormData();
      //   formData.append('file', file);
      //   const { data: { data } } = await this.axios.post(uri2, formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });
      //   response = data;
      // }
      return {
        etag: response.ETag,
        location: response.Location,
        key: response.Key,
        bucket: response.Bucket,
        filename: file.name,
        filetype: file.type,
      };
    } catch (error) {
      throw new ServerError(error);
    }
  }
}

export default GenericService;
