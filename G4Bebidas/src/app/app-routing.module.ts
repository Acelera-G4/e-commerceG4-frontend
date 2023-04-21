import { CardComponent } from './pages/components/card/card.component';

import { CategoriesComponent } from './pages/components/categories/categories.component';
import { CartComponent } from './pages/cart/cart.component';
import { FormAddressComponent } from './pages/sign-up/components/form-address/form-address.component';
import { ModalCreateUserComponent } from './pages/components/modal-create-user/modal-create-user.component';

import { ProductsComponent } from './pages/components/products/products.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ListUsersComponent } from './pages/components/list-users/list-users.component';
import { UsersComponent } from './pages/components/users/users.component';
import { UnauthenticatedUserGuard } from './services/guards/unauthenticated-user/unauthenticated-user.guard';
import { AuthenticatedAdminGuard } from './services/guards/authenticator-admin/authenticated-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'admin',
    component: LoginComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticatedAdminGuard],
  },
  {
    path: 'product',
    component: ProductsComponent,
    canActivate: [AuthenticatedAdminGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthenticatedAdminGuard],
  },
  {
    path: 'category',
    component: CategoriesComponent,
    canActivate: [AuthenticatedAdminGuard],
  },
  {
    path: 'list-users',
    component: ListUsersComponent,
    canActivate: [AuthenticatedAdminGuard],
  },
  {
    path: 'form-address',
    component: FormAddressComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'form-address/:id',
    component: FormAddressComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'modal-create-user',
    component: ModalCreateUserComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'modal-create-user/:id',
    component: ModalCreateUserComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
