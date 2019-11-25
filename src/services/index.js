import injector from 'vue-inject';

import CommonService from './CommonService';
import AccountService from './AccountService';
import GenericService from './GenericService';

injector.service('CommonService', [], CommonService);
injector.service('AccountService', ['axios'], AccountService);
injector.service('GenericService', ['axios', 'apiUrl'], GenericService);
