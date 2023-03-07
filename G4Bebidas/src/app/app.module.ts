import { ChartModule } from 'primeng/chart';

import { ListUsersComponent } from './pages/components/list-users/list-users.component';
import { HeaderComponent } from './pages/components/header/header.component';
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './pages/components/footer/footer.component';
import { CardComponent } from './pages/components/card/card.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './pages/components/products/products.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ModalCreateUserComponent } from './pages/components/modal-create-user/modal-create-user.component';
import { ModalUpdateUserComponent } from './pages/components/modal-update-user/modal-update-user.component';
import { ModalCreateAddressComponent } from './pages/components/modal-create-address/modal-create-address.component';
import { ModalMaiorIdadeComponent } from './pages/components/modal-maior-idade/modal-maior-idade.component';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
// import { ToastService } from 'angular-toastify/lib/toast.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormAddressComponent } from './pages/sign-up/components/form-address/form-address.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    CardComponent,
    SignUpComponent,
    DashboardComponent,
    HeaderComponent,
    ProductsComponent,
    ListUsersComponent,
    ModalCreateUserComponent,
    ModalUpdateUserComponent,
    ModalCreateAddressComponent,
    FormAddressComponent,
    ModalMaiorIdadeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputMaskModule,
    TableModule,
    ChartModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    AngularToastifyModule,
  ],
  exports: [AppRoutingModule],
  providers: [ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
