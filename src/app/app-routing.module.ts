import { inject } from '@angular/core';
import { Routes, RouterModule, Router, provideRouter, withComponentInputBinding } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { ListrecordsComponent } from './ecommerce/listrecords/listrecords.component';
import { OrdersComponent } from './ecommerce/orders/orders.component';
import { CartDetailsComponent } from './ecommerce/cart-details/cart-details.component';
import { CartsComponent } from './ecommerce/carts/carts.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { ListgroupsComponent } from './ecommerce/listgroups/listgroups.component';
import { GenresComponent } from './ecommerce/genres/genres.component';
import { GroupsComponent } from './ecommerce/groups/groups.component';
import { RecordsComponent } from './ecommerce/records/records.component';
import { AdminOrdersComponent } from './ecommerce/admin-orders/admin-orders.component';
import { UsersComponent } from './ecommerce/users/users.component';
import { ApplicationConfig } from '@angular/core';

export const canActivate = () => {
  const guard = inject(AuthGuard);
  if (!guard.isLoggedIn()) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const appRoutes: Routes = [
  // Public routes
  { 
    path: 'login', 
    loadComponent: () => import('./shared/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./shared/register/register.component').then(m => m.RegisterComponent) 
  },
  { 
    path: 'listrecords/:idGroup', 
    loadComponent: () => import('./ecommerce/listrecords/listrecords.component').then(m => m.ListrecordsComponent) 
  },
  { 
    path: 'cart-details', 
    loadComponent: () => import('./ecommerce/cart-details/cart-details.component').then(m => m.CartDetailsComponent) 
  },
  
  // Ecommerce routes with lazy loading
  {
    path: '',
    loadComponent: () => import('./ecommerce/ecommerce.component').then(m => m.EcommerceComponent),
    children: [
      { 
        path: '', 
        loadComponent: () => import('./ecommerce/listgroups/listgroups.component').then(m => m.ListgroupsComponent) 
      },
      { 
        path: 'listrecords/:idGroup', 
        loadComponent: () => import('./ecommerce/listrecords/listrecords.component').then(m => m.ListrecordsComponent) 
      },
      { 
        path: 'listgroups', 
        loadComponent: () => import('./ecommerce/listgroups/listgroups.component').then(m => m.ListgroupsComponent) 
      },
      { 
        path: 'genres', 
        loadComponent: () => import('./ecommerce/genres/genres.component').then(m => m.GenresComponent),
        canActivate: [canActivate]
      },
      { 
        path: 'groups', 
        loadComponent: () => import('./ecommerce/groups/groups.component').then(m => m.GroupsComponent),
        canActivate: [canActivate]
      },
      { 
        path: 'records', 
        loadComponent: () => import('./ecommerce/records/records.component').then(m => m.RecordsComponent),
        canActivate: [canActivate]
      },
      { 
        path: 'cart-details', 
        loadComponent: () => import('./ecommerce/cart-details/cart-details.component').then(m => m.CartDetailsComponent) 
      },
      { 
        path: 'carts', 
        loadComponent: () => import('./ecommerce/carts/carts.component').then(m => m.CartsComponent) 
      },
      { 
        path: 'orders', 
        loadComponent: () => import('./ecommerce/orders/orders.component').then(m => m.OrdersComponent),
        canActivate: [canActivate]
      },
      { 
        path: 'admin-orders', 
        loadComponent: () => import('./ecommerce/admin-orders/admin-orders.component').then(m => m.AdminOrdersComponent),
        canActivate: [canActivate]
      },
      { 
        path: 'users', 
        loadComponent: () => import('./ecommerce/users/users.component').then(m => m.UsersComponent),
        canActivate: [canActivate]
      },
    ]
  },
  { path: '**', redirectTo: '' }
];

// Application configuration with router setup
export const appConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding())
  ]
};

// Export the routes for standalone bootstrap
export const AppRoutingModule = RouterModule.forRoot(appRoutes);
