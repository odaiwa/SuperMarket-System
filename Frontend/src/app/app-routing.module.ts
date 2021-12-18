import { OrderCartComponent } from './components/cart-area/order-cart/order-cart.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { ProductListComponent } from './components/products-area/products-list/products-list.component';

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "logout", component: LogoutComponent },
    { path: "add-product", component: AddProductComponent },
    { path: "products-list", component: ProductListComponent },
    { path: "products/new", component: AddProductComponent },
    { path: "products/update/:id", component: UpdateProductComponent },
    { path: "order", component: OrderCartComponent },
    { path: "**", component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
