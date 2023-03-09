import { CategoriesComponent } from './pages/components/categories/categories.component';
import { CartComponent } from './pages/cart/cart.component';
import { FormAddressComponent } from './pages/sign-up/components/form-address/form-address.component';
import { ModalCreateUserComponent } from './pages/components/modal-create-user/modal-create-user.component';
import { ModalCreateAddressComponent } from './pages/components/modal-create-address/modal-create-address.component';
import { ProductsComponent } from './pages/components/products/products.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ListUsersComponent } from './pages/components/list-users/list-users.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product', component: ProductsComponent },
  { path: 'category', component: CategoriesComponent},
  {path: 'list-users', component: ListUsersComponent },
  { path: 'form-address', component: FormAddressComponent },
  { path: 'form-address/:id', component: FormAddressComponent },
  { path: 'modal-create-address', component: ModalCreateAddressComponent },
  { path: 'modal-create-address/:id', component: ModalCreateAddressComponent },
  { path: 'modal-create-user', component: ModalCreateUserComponent },
  { path: 'modal-create-user/:id', component: ModalCreateUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
