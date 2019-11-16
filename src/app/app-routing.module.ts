import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateZoneGuard } from './guards/private-zone/private.zone.guard';
import { BidItemComponent } from './pages/private/bid-item/bid-item.component';
import { BidsListComponent } from './pages/private/bids-list/bids-list.component';
import { SigninComponent } from './pages/public/signin/signin.component';
import { BidCalculationComponent } from './pages/private/bid-calculation/bid-calculation.component';
import { MenuComponent } from './pages/private/menu/menu.component';

const routes: Routes = [
  { path: 'public/signin', component: SigninComponent },
  { path: 'private/menu', component: MenuComponent, canActivate: [PrivateZoneGuard] },
  { path: 'private/bids/:id', component: BidItemComponent, canActivate: [PrivateZoneGuard] },
  { path: 'private/bids', component: BidsListComponent, canActivate: [PrivateZoneGuard] },
  { path: 'private/bids/:id/calculation ', component: BidCalculationComponent, canActivate: [PrivateZoneGuard] },

  { path: '*', redirectTo: '/public/landing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[PrivateZoneGuard]
})
export class AppRoutingModule { }
