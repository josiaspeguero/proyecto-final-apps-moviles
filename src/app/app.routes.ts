import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'activate',
    loadComponent: () => import('./pages/activate/activate.page').then(m => m.ActivatePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then(m => m.WelcomePage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'vehicles',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/vehicles/vehicles.page').then(m => m.VehiclesPage)
  },
  {
    path: 'vehicle-create',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/vehicle-create/vehicle-create.page').then(m => m.VehicleCreatePage)
  },
  {
    path: 'vehicle-detail/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/vehicle-detail/vehicle-detail.page').then(m => m.VehicleDetailPage)
  },
  {
    path: 'maintenances/:vehiculo_id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/maintenances/maintenances.page').then( m => m.MaintenancesPage)
  },
  {
    path: 'maintenance-create/:vehiculo_id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/maintenance-create/maintenance-create.page').then( m => m.MaintenanceCreatePage)
  },
  {
    path: 'maintenance-detail/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/maintenance-detail/maintenance-detail.page').then( m => m.MaintenanceDetailPage)
  },
  {
    path: 'fuel/:vehiculo_id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/fuel/fuel.page').then( m => m.FuelPage)
  },
  {
    path: 'fuel-create/:vehiculo_id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/fuel-create/fuel-create.page').then( m => m.FuelCreatePage)
  },
  {
    path: 'tires/:vehiculo_id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/tires/tires.page').then( m => m.TiresPage)
  },
  {
    path: 'expenses/:vehiculo_id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/expenses/expenses.page').then( m => m.ExpensesPage)
  },
  {
    path: 'expense-create/:vehiculo_id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/expense-create/expense-create.page').then( m => m.ExpenseCreatePage)
  },
  {
    path: 'income/:vehiculo_id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/income/income.page').then( m => m.IncomePage)
  },
  {
    path: 'income-create/:vehiculo_id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/income-create/income-create.page').then( m => m.IncomeCreatePage)
  }
];
