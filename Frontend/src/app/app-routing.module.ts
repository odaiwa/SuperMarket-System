import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';

const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"home",component:HomeComponent},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"logout",component:LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
