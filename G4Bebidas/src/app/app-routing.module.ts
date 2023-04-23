import { CategoriesComponent } from './pages/components/categories/categories.component';
import { CartComponent } from './pages/cart/cart.component';
import { FormAddressComponent } from './pages/sign-up/components/form-address/form-address.component';

import { ProductsComponent } from './pages/components/products/products.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UsersComponent } from './pages/components/users/users.component';
import { UnauthenticatedUserGuard } from './services/guards/unauthenticated-user/unauthenticated-user.guard';
import { AuthenticatedAdminGuard } from './services/guards/authenticator-admin/authenticated-admin.guard';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { TermsAndConditionComponent } from './pages/components/terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './pages/components/privacy-policy/privacy-policy.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

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
    path: 'cart',
    component: CartComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'terms-and-condition',
    component: TermsAndConditionComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [UnauthenticatedUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
