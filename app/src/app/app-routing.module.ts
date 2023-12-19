import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { AdminCategoryComponent } from './components/admin/admin-category/admin-category.component';
import { AdminRecipeComponent } from './components/admin/admin-recipe/admin-recipe.component';

const routes: Routes = [
    { path: '', component: NavbarComponent },
    { path: 'admin', component: AdminHomeComponent },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'admin/home', component: AdminHomeComponent },
    { path: 'admin/user', component: AdminUserComponent },
    { path: 'admin/category', component: AdminCategoryComponent },
    { path: 'admin/recipe', component: AdminRecipeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
