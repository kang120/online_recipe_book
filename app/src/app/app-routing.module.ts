import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reset_password', component: ResetPasswordComponent },
    { path: 'home', component: HomeComponent },
    //{ path: 'admin', component: AdminHomeComponent },
    //{ path: 'admin/login', component: AdminLoginComponent },
    //{ path: 'admin/home', component: AdminHomeComponent },
    //{ path: 'admin/user', component: AdminUserComponent },
    //{ path: 'admin/category', component: AdminCategoryComponent },
    //{ path: 'admin/recipe', component: AdminRecipeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
