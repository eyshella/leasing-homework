import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/public/signin/signin.component';
import { BidsListComponent } from './pages/private/bids-list/bids-list.component';
import { BidCalculationComponent } from './pages/private/bid-calculation/bid-calculation.component';
import { BidItemComponent } from './pages/private/bid-item/bid-item.component';
import { MenuComponent } from './pages/private/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    BidsListComponent,
    BidCalculationComponent,
    BidItemComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
