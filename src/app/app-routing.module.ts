import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateZoneGuard } from './guards/private-zone/private.zone.guard';
import { SignInGuard } from './guards/signin/signin.guard';
import { AgreementsItemComponent } from './pages/private/agreement-item/agreements-item.component';
import { AgreementsListComponent } from './pages/private/agreements-list/agreements-list.component';
import { BidCalculationComponent } from './pages/private/bid-calculation/bid-calculation.component';
import { BidItemComponent } from './pages/private/bid-item/bid-item.component';
import { BidsListComponent } from './pages/private/bids-list/bids-list.component';
import { GraphicsComponent } from './pages/private/graphics/graphics.component';
import { MenuComponent } from './pages/private/menu/menu.component';
import { SigninComponent } from './pages/public/signin/signin.component';

const routes: Routes = [
  { path: 'public/signin', component: SigninComponent, canActivate: [SignInGuard] },
  { path: 'private/menu', component: MenuComponent, canActivate: [PrivateZoneGuard] },
  { path: 'private/bids/:id', component: BidItemComponent, canActivate: [PrivateZoneGuard] },
  { path: 'private/bids', component: BidsListComponent, canActivate: [PrivateZoneGuard] },
  { path: 'private/agreements', component: AgreementsListComponent, canActivate: [PrivateZoneGuard] },
  { path: 'private/agreements/:id', component: AgreementsItemComponent, canActivate: [PrivateZoneGuard] },
  { path: 'private/graphics', component: GraphicsComponent, canActivate: [PrivateZoneGuard] },
  { path: 'private/bids/:id/calculation', component: BidCalculationComponent, canActivate: [PrivateZoneGuard] },

  { path: '**', redirectTo: '/public/signin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PrivateZoneGuard, SignInGuard]
})
export class AppRoutingModule { }
