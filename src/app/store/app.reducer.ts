import { State as AgreementState, initialState as agreementInitialState, reducer as agreementReducer } from './agreement/agreement.reducer'
import { State as AuthState, initialState as authInitialState, reducer as authReducer } from './auth/auth.reducer'
import { State as BidState, initialState as bidInitialState, reducer as bidReducer } from './bid/bid.reducer'
import { State as ClientState, initialState as clientInitialState, reducer as clientReducer } from './client/client.reducer'
import { ActionReducerMap, State } from '@ngrx/store'

export interface AppState {
  agreement: AgreementState,
  auth: AuthState,
  bid: BidState,
  client: ClientState
}

export const initialState: AppState = {
  agreement: agreementInitialState,
  auth: authInitialState,
  bid: bidInitialState,
  client: clientInitialState
}

export function getInitialState(): AppState {
  return initialState;
}

export const appReducers: ActionReducerMap<AppState, any> = {
  agreement: agreementReducer,
  auth: authReducer,
  bid: bidReducer,
  client: clientReducer
}

export const selectAuthState = (state: AppState) => state.auth;
export const selectAgreementState = (state: AppState) => state.agreement;
export const selectBidState = (state: AppState) => state.bid;
export const selectClientState = (state: AppState) => state.client;
