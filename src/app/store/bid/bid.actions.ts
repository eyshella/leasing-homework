import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Bid } from '../../models/bid';

export const loadBids = createAction(
  '[Bid/API] Load Bids', 
  props<{ bids: Bid[] }>()
);

export const addBid = createAction(
  '[Bid/API] Add Bid',
  props<{ bid: Bid }>()
);

export const upsertBid = createAction(
  '[Bid/API] Upsert Bid',
  props<{ bid: Bid }>()
);

export const addBids = createAction(
  '[Bid/API] Add Bids',
  props<{ bids: Bid[] }>()
);

export const upsertBids = createAction(
  '[Bid/API] Upsert Bids',
  props<{ bids: Bid[] }>()
);

export const updateBid = createAction(
  '[Bid/API] Update Bid',
  props<{ bid: Update<Bid> }>()
);

export const updateBids = createAction(
  '[Bid/API] Update Bids',
  props<{ bids: Update<Bid>[] }>()
);

export const deleteBid = createAction(
  '[Bid/API] Delete Bid',
  props<{ id: string }>()
);

export const deleteBids = createAction(
  '[Bid/API] Delete Bids',
  props<{ ids: string[] }>()
);

export const clearBids = createAction(
  '[Bid/API] Clear Bids'
);
