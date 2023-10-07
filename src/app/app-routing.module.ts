import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './services/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';

const routes: Routes = [
  {path:'', component:BlankLayoutComponent, children:[
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', canActivate:[authGuard] , component:HomeComponent},
    {path:'wishlist', canActivate:[authGuard] , component:WishListComponent},
    {path:'cart', canActivate:[authGuard] , component:CartComponent},
    {path:'products', canActivate:[authGuard] , component:ProductsComponent},
    {path:'details/:id', canActivate:[authGuard] , component:ProductDetailsComponent},
    {path:'categories', canActivate:[authGuard] , component:CategoriesComponent},
    {path:'brands', canActivate:[authGuard] , component:BrandsComponent},
    {path:'allorders', canActivate:[authGuard] , component:AllOrdersComponent},
    {path:'payment/:id', canActivate:[authGuard] , component:PaymentComponent},
  ]},
  
  {path:'', component:AuthLayoutComponent, children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'forgetpassword',component:ForgetpasswordComponent},
  ]},
  {path:'**',component:NotfoundComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
