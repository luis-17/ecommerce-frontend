export default {
  getSignedURL(file, config) {
    let payload = {
      filePath: file.name,
      contentType: file.type,
    };

    return new Promise((resolve, reject) => {
      const fd = new FormData();
      const request = new XMLHttpRequest();
      const signingURL = (typeof config.signingURL === 'function') ? config.signingURL(file) : config.signingURL;
      request.open('POST', signingURL);
      request.onload = function onload() {
        if (request.status === 200) {
          resolve(JSON.parse(request.response));
        } else {
          reject((request.statusText));
        }
      };
      request.onerror = function onerror(err) {
        // Vue.$log.error('Network Error : Could not send request to AWS (Maybe CORS errors)', err);
        reject(err);
      };
      Object.entries(config.headers || {}).forEach(([name, value]) => {
        request.setRequestHeader(name, value);
      });
      payload = Object.assign(payload, config.params || {});
      Object.entries(payload).forEach(([name, value]) => {
        fd.append(name, value);
      });

      request.send(fd);
    });
  },
  sendFile(file, config) {
    const handler = this.sendS3Handler;
    return this.getSignedURL(file, config)
      .then(response => handler(response, file))
      .catch((error) => {
        throw new Error(error);
      });
  },
  /* eslint-disable prefer-promise-reject-errors */
  sendS3Handler(response, file) {
    const fd = new FormData();
    const { signature } = response;

    Object.keys(signature).forEach(key => fd.append(key, signature[key]));
    fd.append('file', file);
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('POST', response.postEndpoint);
      request.onload = function onload() {
        if (request.status === 201) {
          const xmlDoc = (new window.DOMParser()).parseFromString(request.response, 'text/xml');
          const Bucket = xmlDoc.getElementsByTagName('Bucket')[0].childNodes[0].nodeValue;
          const ETag = xmlDoc.getElementsByTagName('ETag')[0].childNodes[0].nodeValue;
          const Key = xmlDoc.getElementsByTagName('Key')[0].childNodes[0].nodeValue;
          const Location = xmlDoc.getElementsByTagName('Location')[0].childNodes[0].nodeValue;
          resolve({
            Bucket, ETag, Key, Location,
          });
        } else {
          const xmlDoc = (new window.DOMParser()).parseFromString(request.response, 'text/xml');
          const code = xmlDoc.getElementsByTagName('Code')[0].childNodes[0].nodeValue;
          switch (code) {
            case 'EntityTooLarge': {
              const maxSizeAllowed = parseInt(xmlDoc.getElementsByTagName('MaxSizeAllowed')[0].childNodes[0].nodeValue, 10) / (1024 * 1024);
              // reject(new Error(`El archivo excede el m\u00E1ximo de ${maxSizeAllowed}MB`));
              reject(`El archivo excede el m\u00E1ximo de ${maxSizeAllowed}MB`);
              break;
            }
            default:
              reject('Ocurri\u00F3 un error inesperado, intente de nuevo');
          }
        }
      };
      request.onerror = function onerror() {
        const s3Error = (new window.DOMParser()).parseFromString(request.response, 'text/xml');
        const errMsg = s3Error.firstChild.children[1].innerHTML;
        reject({
          success: false,
          message: errMsg,
        });
      };
      request.send(fd);
    });
  },
};
