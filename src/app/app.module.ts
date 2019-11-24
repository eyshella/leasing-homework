import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/public/signin/signin.component';
import { BidsListComponent } from './pages/private/bids-list/bids-list.component';
import { BidCalculationComponent } from './pages/private/bid-calculation/bid-calculation.component';
import { BidItemComponent } from './pages/private/bid-item/bid-item.component';
import { MenuComponent } from './pages/private/menu/menu.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgreementsListComponent } from './pages/private/agreements-list/agreements-list.component';
import { AgreementsItemComponent } from './pages/private/agreement-item/agreements-item.component';
import { GraphicsComponent } from './pages/private/graphics/graphics.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    BidsListComponent,
    BidCalculationComponent,
    BidItemComponent,
    MenuComponent,
    AgreementsListComponent,
    AgreementsItemComponent,
    GraphicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
