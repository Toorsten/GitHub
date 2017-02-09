import { TranslateService } from './translate/translate.service';
import { TRANSLATION_PROVIDERS } from './translate/translation';
import { HttpModule } from '@angular/http';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BalanceQueryComponent } from './components/balance-query/balance-query.component';
import { ActivationQueryComponent } from './components/activation-query/activation-query.component';
import { TranslatePipe } from './translate/translate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BalanceQueryComponent,
    ActivationQueryComponent,
    TranslatePipe
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [TRANSLATION_PROVIDERS, TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
