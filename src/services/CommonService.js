const stringConstructor = 'test'.constructor;
const arrayConstructor = [].constructor;
const objectConstructor = {}.constructor;

function whatIsIt(object) {
  if (object === null) {
    return 'null';
  }
  if (object === undefined) {
    return 'undefined';
  }
  if (object.constructor === stringConstructor) {
    return 'string';
  }
  if (object.constructor === arrayConstructor) {
    return 'array';
  }
  if (object.constructor === objectConstructor) {
    return 'object';
  }
  return (typeof object);
}

class CommonService {
  assign(target, source) {
    if (source !== null) {
      Object.keys(source).filter(key => key in target).forEach((key) => {
        if (whatIsIt(target[key]) === 'object' && whatIsIt(source[key]) === 'object') {
          this.assign(target[key], source[key]);
        } else {
          target[key] = source[key]; // eslint-disable-line
        }
      });
    }
    return target;
  }
}

export default CommonService;
