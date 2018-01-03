import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { AuthGuard } from './guards/auth.guard';
import { DepartmentResolver } from './resolves/department.resolve';

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent

  },
  {
    path: '',
    component: IndexComponent,
    canActivateChild: [AuthGuard],
    resolve: { departments: DepartmentResolver },
    children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }