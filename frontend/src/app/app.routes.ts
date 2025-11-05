import { Routes } from '@angular/router';
import { PageNames } from '../model/enum';

export const routes: Routes = [
    {
        path: '',
        redirectTo: PageNames.DASHBOARD,
        pathMatch: 'full'
    },
    {
        path: PageNames.DASHBOARD,
        loadComponent: () => import('../components/pages/dashboard/dashboard.component').then((c) => c.DashboardComponent)
    },
    {
        path: PageNames.CONTRACT,
        loadComponent: () => import('../components/pages/contract/contract.component').then((c) => c.ContractComponent)
    },
    {
        path: PageNames.PAYMENT,
        loadComponent: () => import('../components/pages/payment/payment.component').then((c) => c.PaymentComponent)
    },
    {
        path: '**',
        redirectTo: PageNames.DASHBOARD
    }
];