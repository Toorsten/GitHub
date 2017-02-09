import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { BalanceQueryComponent } from './components/balance-query/balance-query.component';
import { ActivationQueryComponent } from './components/activation-query/activation-query.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'activation-query', component: ActivationQueryComponent },
    { path: 'activation-query/:token', component: ActivationQueryComponent },
    { path: 'balance-query', component: BalanceQueryComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);