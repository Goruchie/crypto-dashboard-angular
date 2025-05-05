import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PriceHistoryComponent } from './pages/price-history/price-history.component';
import { ComparisonComponent } from './pages/comparison/comparison.component';

export const routes: Routes = [
    
    { path: '', component: DashboardComponent },
    { path: 'price-history', component: PriceHistoryComponent },
    { path: 'comparison', component: ComparisonComponent },

];
