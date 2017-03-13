import { user } from './reducers/state';
import { loadUser } from './actions/user';

export * as actions from './actions/user';
export { UserApp } from './components';
export {
  UserAppContainer,
  UserAvatarContainer as UserAvatar,
  UserMenuContainer as UserMenu,
  UserPasswordContainer as UserPassword,
  UserProfileContainer as UserProfile,
} from './containers';
export { validate } from './helpers';
export { default as routes } from './routes';

export function loader(store) {
  store.dispatch(loadUser());
}

export const state = {
  user,
};
