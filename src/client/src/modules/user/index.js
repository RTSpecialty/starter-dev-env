import { user } from './reducers/state';
import { loadUser } from './actions/user';

export * as actions from './actions/user';
export { UserApp, UserPassword, UserProfile } from './components';
export {
  UserAppContainer,
  UserAvatarContainer as UserAvatar,
  UserMenuContainer as UserMenu,
} from './containers';
export { default as routes } from './routes';

export function loader(store) {
  store.dispatch(loadUser());
}

export const state = {
  user,
};
