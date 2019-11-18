import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Bid } from '../../models/bid';
import * as BidActions from './bid.actions';

export const bidsFeatureKey = 'bids';

export interface State extends EntityState<Bid> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Bid> = createEntityAdapter<Bid>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

const bidReducer = createReducer(
  initialState,
  on(BidActions.addBid,
    (state, action) => adapter.addOne(action.bid, state)
  ),
  on(BidActions.upsertBid,
    (state, action) => adapter.upsertOne(action.bid, state)
  ),
  on(BidActions.addBids,
    (state, action) => adapter.addMany(action.bids, state)
  ),
  on(BidActions.upsertBids,
    (state, action) => adapter.upsertMany(action.bids, state)
  ),
  on(BidActions.updateBid,
    (state, action) => adapter.updateOne(action.bid, state)
  ),
  on(BidActions.updateBids,
    (state, action) => adapter.updateMany(action.bids, state)
  ),
  on(BidActions.deleteBid,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(BidActions.deleteBids,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(BidActions.loadBids,
    (state, action) => adapter.addAll(action.bids, state)
  ),
  on(BidActions.clearBids,
    state => adapter.removeAll(state)
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return bidReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
