import { Ability } from '@casl/ability';
import accountType from '@/store/types/account';
import Roles from '@/constants/Roles';
import invert from 'lodash/invert';

export const ability = new Ability();

export const abilityPlugin = (store) => {
  ability.update([]);

  return store.subscribe((mutation) => {
    switch (mutation.type) {
      case accountType.mutations.loginSuccess: {
        // console.log(mutation.payload, 'mutation.payload ghj');
        const { username } = mutation.payload.user;
        const abilities = [{
          actions: 'logged',
          subject: 'USER',
        }, {
          actions: 'username',
          subject: username,
        }];
        ability.update(abilities);
        break;
      }
      case accountType.mutations.logout:
        ability.update([]);
        break;
      default:
        // empty
        break;
    }
  });
};
