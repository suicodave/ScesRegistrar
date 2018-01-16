import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DepartmentService } from '../services/department.service';
import { Department } from '../interfaces/department';
import { HomeComponent } from '../home/home.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddStudentComponent } from '../modals/add-student/add-student.component';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  searchInput;
  homeComponent: HomeComponent;
  currentDepartment = 1;

  departments: Department[];
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private activeRoute: ActivatedRoute, private authService: AuthService, private departmentService: DepartmentService, private dialog: MatDialog, private snackBar: MatSnackBar, private studentService: StudentService) { }

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
    const dialogref = this.dialog.open(AddStudentComponent, {
      width: '100%'
    });

    const addSuccess = dialogref.componentInstance.onRegStudentSuccess
      .subscribe(
      (res) => {
        this.snackBar.open(res.externalMessage, 'Okay', {
          duration: 5000
        });
        if (this.homeComponent instanceof HomeComponent) {
          this.homeComponent.getStudents();
        }

      }
      );

    const onRegisterFaulre = dialogref.componentInstance.onRegStudentFailure
      .subscribe(
      (err) => {
        if ('externalMessage' in err) {
          this.snackBar.open(err.externalMessage, 'Okay', {
            duration: 5000
          });
        }
        // tslint:disable-next-line:forin
        for (const errorField in err.error.errors) {
          for (const error of err.error.errors[errorField]) {
            this.snackBar.open(error, 'Okay', {
              duration: 5000
            });
          }
        }

      }
      );


  }

  searchStudent(element, query?) {
    if (query == '' || query == null) {
      return;
    }
    element.blur();
    this.studentService.searchStudent(query);
    if (this.homeComponent instanceof HomeComponent) {
      this.homeComponent.listenForSearch();

    }

  }


}
