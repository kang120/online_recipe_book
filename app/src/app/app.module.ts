import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { AdminCategoryComponent } from './components/admin/admin-category/admin-category.component';
import { AdminRecipeComponent } from './components/admin/admin-recipe/admin-recipe.component'

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        AdminNavbarComponent,
        AdminLoginComponent,
        AdminHomeComponent,
        AdminUserComponent,
        AdminCategoryComponent,
        AdminRecipeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
