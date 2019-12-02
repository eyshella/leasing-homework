import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgreementsItemComponent } from './pages/private/agreement-item/agreements-item.component';
import { AgreementsListComponent } from './pages/private/agreements-list/agreements-list.component';
import { BidCalculationComponent } from './pages/private/bid-calculation/bid-calculation.component';
import { BidItemComponent } from './pages/private/bid-item/bid-item.component';
import { BidsListComponent } from './pages/private/bids-list/bids-list.component';
import { GraphicsComponent } from './pages/private/graphics/graphics.component';
import { MenuComponent } from './pages/private/menu/menu.component';
import { SigninComponent } from './pages/public/signin/signin.component';
import { appReducers } from './store/app.reducer';
import { CatalogueComponent } from './pages/private/catalogue/catalogue.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ClientsListComponent } from './pages/private/clients-list/clients-list.component';
import { ClientItemComponent } from './pages/private/client-item/client-item.component';

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
    GraphicsComponent,
    CatalogueComponent,
    ClientsListComponent,
    ClientItemComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
