import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Agreement } from '../../models/agreement';
import * as AgreementActions from './agreement.actions';

export const agreementsFeatureKey = 'agreements';

export interface State extends EntityState<Agreement> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Agreement> = createEntityAdapter<Agreement>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

const agreementReducer = createReducer(
  initialState,
  on(AgreementActions.addAgreement,
    (state, action) => adapter.addOne(action.agreement, state)
  ),
  on(AgreementActions.upsertAgreement,
    (state, action) => adapter.upsertOne(action.agreement, state)
  ),
  on(AgreementActions.addAgreements,
    (state, action) => adapter.addMany(action.agreements, state)
  ),
  on(AgreementActions.upsertAgreements,
    (state, action) => adapter.upsertMany(action.agreements, state)
  ),
  on(AgreementActions.updateAgreement,
    (state, action) => adapter.updateOne(action.agreement, state)
  ),
  on(AgreementActions.updateAgreements,
    (state, action) => adapter.updateMany(action.agreements, state)
  ),
  on(AgreementActions.deleteAgreement,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(AgreementActions.deleteAgreements,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(AgreementActions.loadAgreements,
    (state, action) => adapter.addAll(action.agreements, state)
  ),
  on(AgreementActions.clearAgreements,
    state => adapter.removeAll(state)
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return agreementReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
