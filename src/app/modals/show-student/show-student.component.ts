import { Component, OnInit, Inject, OnDestroy, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatRadioChange } from '@angular/material';
import { Student, SchoolYear, Department, College, YearLevel } from '../../interfaces/department';
import { SchoolSettingService } from '../../services/school-setting.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.scss']
})
export class ShowStudentComponent implements OnInit, OnDestroy {

  student: Student;
  isEnrollMode = false;
  schoolSettingObs;

  schoolYears: SchoolYear[];
  departments: Department[];
  colleges: College[];
  yearLevels: YearLevel[];
  activeSchoolYear: SchoolYear;
  myForm: FormGroup;
  hasSelectedDepartment = false;
  settingsHasLoaded = false;
  isCollege = false;

  onEnrollSuccess = new EventEmitter();
  onEnrollFailure = new EventEmitter();

  constructor( @Inject(MAT_DIALOG_DATA) private data, private schoolSettingService: SchoolSettingService, private fb: FormBuilder) { }

  ngOnInit() {
    this.student = this.data.student;
    console.log(this.student);

  }
  ngOnDestroy() {
    if (this.schoolSettingObs != undefined) {
      this.schoolSettingObs.unsubscribe();
    }
  }

  enrollMode(arg: boolean) {
    this.isEnrollMode = arg;

    if (this.isEnrollMode) {
      this.getSchoolSettings();
    }

  }

  getSchoolSettings() {
    this.settingsHasLoaded = false;
    const getSY =
      this.schoolSettingService.getSchoolYears();
    const getDep =
      this.schoolSettingService.getDepartments();
    const getCol = this.schoolSettingService.getColleges();
    const getASY = this.schoolSettingService.getActiveSchoolYear();

    this.schoolSettingObs = combineLatest([getSY, getDep, getCol, getASY]).subscribe(
      (res: any) => {
        this.schoolYears = res[0].data;
        this.departments = res[1].data;
        this.colleges = res[2].data;
        this.activeSchoolYear = res[3].data;
        this.settingsHasLoaded = true;
        this.initForm();

      }
    );
  }

  initForm() {
    this.myForm = this.fb.group({
      department: [this.student.department, Validators.required],
      school_year: [this.activeSchoolYear.id, Validators.required],
      year_level: ['', Validators.required]
    });
    this.checkIfCollegeDepartment();
  }



  checkIfCollegeDepartment(event?: MatRadioChange) {
    this.hasSelectedDepartment = true;
    let department: Department;

    if (event != undefined) {
      department = event.value;
    } else {
      department = (this.departments.find(dep => dep.id == this.student.department.id));
    }

    this.yearLevels = department.year_levels;
    this.myForm.patchValue({ year_level: this.yearLevels[0].id });
    if (department.name == 'College') {
      this.isCollege = true;
      this.myForm.addControl('college', new FormControl(this.colleges[0].id, Validators.required));

      return;
    }
    this.isCollege = false;
    this.myForm.removeControl('college');
  }

  enrollStudent(form: FormGroup) {
    console.log(this.student);
    if (form.invalid) {
      return false;
    }

    const department_id = form.value.department.id;
    const year_level_id = form.value.year_level;
    const school_year_id = form.value.school_year;
    const college_id = form.value.college || 0;
    // console.log(department_id);
    // console.log(college_id);
    // console.log(year_level_id);
    // console.log(school_year_id);

    this.student.department = this.departments.find((dep) => dep.id == department_id);

    const currentDep: Department = this.departments.find((dep) => dep.id == department_id);

    this.student.college = this.colleges.find((col) => col.id == college_id);
    this.student.year_level = currentDep.year_levels.find((yl) => yl.id == year_level_id);

    this.student.school_year = this.schoolYears.find((sy) => sy.id == school_year_id);

    this.enrollMode(false);



  }


}