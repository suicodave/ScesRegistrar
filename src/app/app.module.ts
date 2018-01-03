import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MyMaterialModule } from './my-material-module';
import { IndexComponent } from './index/index.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentService } from './services/department.service';
import { DepartmentResolver } from './resolves/department.resolve';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AuthComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MyMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [AuthService, AuthGuard, DepartmentService, DepartmentResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
