/* eslint-disable no-restricted-syntax */
import defaults from 'defaults';

export const mapWrapper = (actions, options) => {
  options = defaults(options, {
    waiter: 'global', returnWhenFail: null, forbiddenView: 'Login',
  });
  // console.log(options, 'optionsss');
  const mappings = {};
  for (const [method, action] of Object.entries(actions)) {
    mappings[method] = async function (...args) {
      this.$log.debug(`method -> ${method}`);
      try {
        this.$wait.start(options.waiter);
        return await action.apply(this, args);
      } catch (err) {
        this.$swal({ type: err.type, text: err.message });
        if ([403, 500, 404].includes(err.status)) {
          this.$router.push({ name: options.forbiddenView });
        }
      } finally {
        this.$wait.end(options.waiter);
      }
      return options.returnWhenFail;
    };
  }
  return mappings;
};

export const mapValidation = (actions, options) => {
  options = defaults(options, {
    waiter: 'global', returnWhenFail: null, forbiddenView: 'Login',
  });
  // console.log(options, 'optionsss');
  // console.log(actions, 'actionsss');

  const mappings = {};
  for (const [_method, action] of Object.entries(actions)) {
    let method;
    let form;
    if (_method.indexOf('#') === -1) {
      form = _method.replace('on', 'form');
      method = _method;
    } else {
      ([method, form] = _method.split('#'));
    }
    mappings[method] = async function (...args) {
      this.$log.debug(`method -> ${method}`);
      this.$log.debug(`validation:form -> ${form}`);
      const isValid = await this.$validator.validateAll(form);
      this.$log.debug(`validation:form -> ${form} -> isValid -> ${isValid}`);
      if (isValid) {
        try {
          this.$wait.start(options.waiter);
          return await action.apply(this, args);
        } catch (err) {
          this.$log.debug(`validation:form -> ${form} -> Error -> ${err.status}`);
          console.log(err.message, 'err.message swalllll')
          this.$swal({ type: err.type, text: err.message });
          if (err.status === 403) {
            this.$router.push({ name: options.forbiddenView });
          }
        } finally {
          this.$wait.end(options.waiter);
        }
      }
      // this.$log.debug(options, 'options post');
      // this.$log.debug(actions, 'actions post2');
      return options.returnWhenFail;
    };
  }
  return mappings;
};
