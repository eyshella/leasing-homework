import { Action, createReducer, on, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Client } from '../../models/client';
import * as ClientActions from './client.actions';

export const clientsFeatureKey = 'clients';

export interface State extends EntityState<Client> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Client> = createEntityAdapter<Client>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

const clientReducer = createReducer(
  initialState,
  on(ClientActions.addClient,
    (state, action) => adapter.addOne(action.client, state)
  ),
  on(ClientActions.upsertClient,
    (state, action) => adapter.upsertOne(action.client, state)
  ),
  on(ClientActions.addClients,
    (state, action) => adapter.addMany(action.clients, state)
  ),
  on(ClientActions.upsertClients,
    (state, action) => adapter.upsertMany(action.clients, state)
  ),
  on(ClientActions.updateClient,
    (state, action) => adapter.updateOne(action.client, state)
  ),
  on(ClientActions.updateClients,
    (state, action) => adapter.updateMany(action.clients, state)
  ),
  on(ClientActions.deleteClient,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ClientActions.deleteClients,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ClientActions.loadClients,
    (state, action) => adapter.addAll(action.clients, state)
  ),
  on(ClientActions.clearClients,
    state => adapter.removeAll(state)
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return clientReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectClient = createSelector(
  selectEntities,
  (entities, props) => entities[props.id]
);