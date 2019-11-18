import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Agreement } from '../../models/agreement';

export const loadAgreements = createAction(
  '[Agreement/API] Load Agreements', 
  props<{ agreements: Agreement[] }>()
);

export const addAgreement = createAction(
  '[Agreement/API] Add Agreement',
  props<{ agreement: Agreement }>()
);

export const upsertAgreement = createAction(
  '[Agreement/API] Upsert Agreement',
  props<{ agreement: Agreement }>()
);

export const addAgreements = createAction(
  '[Agreement/API] Add Agreements',
  props<{ agreements: Agreement[] }>()
);

export const upsertAgreements = createAction(
  '[Agreement/API] Upsert Agreements',
  props<{ agreements: Agreement[] }>()
);

export const updateAgreement = createAction(
  '[Agreement/API] Update Agreement',
  props<{ agreement: Update<Agreement> }>()
);

export const updateAgreements = createAction(
  '[Agreement/API] Update Agreements',
  props<{ agreements: Update<Agreement>[] }>()
);

export const deleteAgreement = createAction(
  '[Agreement/API] Delete Agreement',
  props<{ id: string }>()
);

export const deleteAgreements = createAction(
  '[Agreement/API] Delete Agreements',
  props<{ ids: string[] }>()
);

export const clearAgreements = createAction(
  '[Agreement/API] Clear Agreements'
);
