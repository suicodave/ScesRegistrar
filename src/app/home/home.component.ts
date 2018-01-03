import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';
import { MatSnackBar } from '@angular/material';
import { DepartmentService } from '../services/department.service';
import { Department } from '../interfaces/department';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  emitedDepartmentId;
  currentDepartment: Department;
  // tslint:disable-next-line:max-line-length
  constructor(private activeRoute: ActivatedRoute, private snackBar: MatSnackBar, private router: Router, private departmentService: DepartmentService) { }

  ngOnInit() {
    this.checkDepartmentQuery();


  }

  checkDepartmentQuery() {
    this.activeRoute.queryParams
      .subscribe(
      (param) => {
        if ('department' in param) {
          if (isNaN(param.department)) {
            this.router.navigate(['.']);
            return false;
          }
        }
        this.emitedDepartmentId = param.department;
        this.departmentService.getDepartments()
          .pluck('data')
          .subscribe(
          (res: Department[]) => {

            this.currentDepartment = (res.find(dep => dep.id == this.emitedDepartmentId));

          });
      }
      );

  }

  sayHi() {
    console.log('hi');

  }


}


