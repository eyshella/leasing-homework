import { Action, createReducer, on, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AuthInfo } from '../../models/auth-info';
import * as AuthActions from './auth.actions';

export interface State extends AuthInfo { }

export const authsFeatureKey = 'auths';

export const initialState: State = null;

const authReducer = createReducer(
  initialState,
  on(AuthActions.upsertAuth,
    (state, action) => {
      localStorage.setItem(authsFeatureKey, JSON.stringify(action.auth));

      return action.auth;
    }
  ),
  on(AuthActions.loadAuth,
    () => {
      const authInfoLoaded: string = localStorage.getItem(authsFeatureKey);
      if (authInfoLoaded == null) {
        return null;
      }

      return JSON.parse(authInfoLoaded);
    }
  ),
  on(AuthActions.clearAuths,
    (state, action) => {
      localStorage.removeItem(authsFeatureKey);

      return null
    }
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}