import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { ChartModule } from 'primeng/chart';

import { ListUsersComponent } from './pages/components/list-users/list-users.component';
import { HeaderComponent } from './pages/components/header/header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { InputSwitchModule } from 'primeng/inputswitch';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ModalCreateUserComponent } from './pages/components/modal-create-user/modal-create-user.component';
import { ModalUpdateUserComponent } from './pages/components/modal-update-user/modal-update-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalMaiorIdadeComponent } from './pages/components/modal-maior-idade/modal-maior-idade.component';
import { CategoriesComponent } from './pages/components/categories/categories.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormAddressComponent } from './pages/sign-up/components/form-address/form-address.component';
import { CartComponent } from './pages/cart/cart.component';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CarouselComponent } from './pages/components/carousel/carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { UsersComponent } from './pages/components/users/users.component';
import { SplitterModule } from 'primeng/splitter';
import { EmailComponent } from './pages/components/email/email.component';
import { EmailService } from './services/email.service';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { ModalPaymentComponent } from './pages/components/modal-payment/modal-payment.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TcCardModule } from '@ngx-tc/card';
import { TooltipModule } from 'primeng/tooltip';

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
    FormAddressComponent,
    ModalMaiorIdadeComponent,
    CartComponent,
    CategoriesComponent,
    CarouselComponent,
    UsersComponent,
    ModalPaymentComponent,
    EmailComponent,
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
    SidebarModule,
    FormsModule,
    DropdownModule,
    CardModule,
    ProgressSpinnerModule,
    CarouselModule,
    InputSwitchModule,
    SplitterModule,
    AccordionModule,
    TabViewModule,
    RadioButtonModule,
    AngularToastifyModule,
    TooltipModule,
  ],
  exports: [AppRoutingModule],
  providers: [ToastService, EmailService],
  bootstrap: [AppComponent],
})
export class AppModule {}
