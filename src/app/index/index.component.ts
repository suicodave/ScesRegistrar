import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DepartmentService } from '../services/department.service';
import { Department } from '../interfaces/department';
import { HomeComponent } from '../home/home.component';
import { MatDialog } from '@angular/material';
import { AddStudentComponent } from '../modals/add-student/add-student.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  homeComponent: HomeComponent;
  currentDepartment = 1;

  departments: Department[];
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private activeRoute: ActivatedRoute, private authService: AuthService, private departmentService: DepartmentService, private dialog: MatDialog) { }

  ngOnInit() {

    this.checkFromResolveService();

  }

  checkFromResolveService() {
    this.activeRoute.data.subscribe(
      (res: any) => {
        if ('departments' in res) {
          this.departments = res.departments.data;

          this.checkDepartmentQuery();
        }

      }
    );
  }
  checkDepartmentQuery() {
    this.activeRoute.queryParams
      .subscribe(
      (query) => {

        if (!('department' in query)) {
          this.router.navigate(['/home'], { queryParams: { department: this.departments[0].id } });
        }
      }
      );
  }

  signOut() {
    this.authService.signOut();
  }

  getDepartments(items?, orderBy?, orderValue?) {
    this.departmentService.getDepartments(items, orderBy, orderValue).subscribe(
      (res: any) => {
        this.departments = res.data;


      }
    );
  }

  getComponentfromRouterOutlet(component) {

    if (component instanceof HomeComponent) {
      this.homeComponent = component;
    }


  }

  addStudent() {
    if (this.homeComponent instanceof HomeComponent) {
      this.dialog.open(AddStudentComponent, {
        width: '100%'
      });
    }
  }


}
