import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';

import { MatSnackBar, MatSelectChange, MatCheckboxChange, MatDialog } from '@angular/material';
import { DepartmentService } from '../services/department.service';
import { Department, SchoolYear, Student } from '../interfaces/department';
import { SchoolSettingService } from '../services/school-setting.service';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { StudentService } from '../services/student.service';
import { ISubscription } from 'rxjs/Subscription';
import { ShowStudentComponent } from '../modals/show-student/show-student.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  emitedDepartmentId;
  currentDepartment: Department;
  schoolYears: SchoolYear[];
  activeSchoolYear: SchoolYear;
  students: Student[];
  searchedStudents: Student[];
  settingsHasLoaded = false;
  studentsHasLoaded = false;
  searchHasLoaded = false;
  isSearching = false;
  studentSubscriber: ISubscription;
  searchedQuery;

  searchObs;
  // tslint:disable-next-line:max-line-length
  constructor(private activeRoute: ActivatedRoute, private schoolSettingService: SchoolSettingService, private snackBar: MatSnackBar, private router: Router, private departmentService: DepartmentService, private studentService: StudentService, private dialog: MatDialog) { }

  ngOnInit() {

    this.checkDepartmentQuery();


  }

  ngOnDestroy() {
    if (this.studentSubscriber != undefined) {
      this.studentSubscriber.unsubscribe();
    }
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
        this.settingsHasLoaded = false;
        this.emitedDepartmentId = param.department;
        this.loadSchoolSettings();
      }
      );

  }




  schoolYearChange(event: MatSelectChange) {
    this.studentsHasLoaded = false;
    this.getStudents(this.currentDepartment.id, this.activeSchoolYear.id);

  }

  loadSchoolSettings(items?, orderBy?, orderValue?) {
    this.studentsHasLoaded = false;
    const getSchoolYears = this.schoolSettingService.getSchoolYears(items, orderBy, orderValue);
    const getActiveSY = this.schoolSettingService.getActiveSchoolYear();
    const getCurrentDepartment = this.departmentService.getDepartments().pluck('data');

    combineLatest([getSchoolYears, getActiveSY, getCurrentDepartment,]).subscribe(
      (res: any) => {
        this.schoolYears = res[0].data;
        this.activeSchoolYear = res[1].data;
        this.currentDepartment = (res[2].find(dep => dep.id == this.emitedDepartmentId));
        this.settingsHasLoaded = true;
        this.getStudents(this.currentDepartment.id, this.activeSchoolYear.id);
      },
      err => console.log(err)
    );

  }

  getStudents(dep_id?, sy_id?, items?, orby?, orval?) {

    this.studentSubscriber = this.studentService.getStudents(dep_id, sy_id, items, orby, orval).subscribe(
      (res: any) => {
        this.students = res.data;
        this.studentsHasLoaded = true;
      }

    );
  }

  listenForSearch() {
    this.isSearching = true;
    this.searchHasLoaded = false;
    this.searchObs = this.studentService.searchResult
      .take(1)
      .subscribe((res) => {
        this.searchedQuery = res;
        console.log(this.searchedQuery);
        this.studentService.findStudents(undefined, undefined, undefined, this.searchedQuery).
          subscribe((searchRes: any) => {
            console.log(searchRes.data);

            this.searchedStudents = searchRes.data;
            this.searchHasLoaded = true;
          });
      });
  }

  closeSearching() {
    this.isSearching = false;
    this.searchHasLoaded = false;
  }

  showStudent(student: Student) {
    this.dialog.open(ShowStudentComponent, {
      width: '650px',
      data: { student: student }
    });
  }
}



