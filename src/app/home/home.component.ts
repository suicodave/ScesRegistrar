import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/from';

import { MatSnackBar, MatSelectChange } from '@angular/material';
import { DepartmentService } from '../services/department.service';
import { Department, SchoolYear } from '../interfaces/department';
import { SchoolSettingService } from '../services/school-setting.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  emitedDepartmentId;
  currentDepartment: Department;
  schoolYears: SchoolYear[];
  activeSchoolYear: SchoolYear[];
  id = 1;

  // tslint:disable-next-line:max-line-length
  constructor(private activeRoute: ActivatedRoute, private schoolSettingService: SchoolSettingService, private snackBar: MatSnackBar, private router: Router, private departmentService: DepartmentService) { }

  ngOnInit() {
    this.checkDepartmentQuery();
    this.getSchoolYears();
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

  getSchoolYears(items?, orderBy?, orderValue?) {
    this.schoolSettingService.getSchoolYears(items, orderBy, orderValue).subscribe(
      (res: any) => {
        this.schoolYears = res.data;
        this.getActiveSchoolYearId();


      }

    );
  }

  getActiveSchoolYearId() {
    this.schoolSettingService.getActiveSchoolYear().subscribe(
      (res: any) => {
        this.activeSchoolYear = res.data;

      }
    );
  }

  getStudents(event: MatSelectChange) {
    console.log(event.value);


  }


}


