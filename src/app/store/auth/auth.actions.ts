import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { AuthInfo } from '../../models/auth-info';

export const loadAuth = createAction(
  '[Auth/API] Load Auth'
);

export const upsertAuth = createAction(
  '[Auth/API] Upsert Auth',
  props<{ auth: AuthInfo }>()
);

export const clearAuths = createAction(
  '[Auth/API] Clear Auths'
);
