import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatRadioChange, ErrorStateMatcher, MatDialogRef } from '@angular/material';
import { SchoolSettingService } from '../../services/school-setting.service';
import { SchoolYear, Department, College, YearLevel } from '../../interfaces/department';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit, OnDestroy {
  studentTypes = [
    'New',
    'Old'
  ];

  newStudentForm: FormGroup;

  colleges: College[];
  departments: Department[];
  schoolYears: SchoolYear[];
  yearLevels: YearLevel[];
  activeSchoolYear: SchoolYear;
  matcher = new MyErrorStateMatcher();

  hasSelectedDepartment = false;
  isCollege = false;
  settingsHasLoaded = false;


  onRegStudentSuccess = new EventEmitter();
  onRegStudentFailure = new EventEmitter();

  schoolSettingObs;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private schoolSettingService: SchoolSettingService, private activeRoute: ActivatedRoute, private studentService: StudentService, private dialog: MatDialogRef<AddStudentComponent>) { }

  ngOnInit() {
    this.getSchoolSettings();
  }
  ngOnDestroy() {
    if (this.schoolSettingObs != undefined) {
      this.schoolSettingObs.unsubscribe();
    }
  }

  initForms() {

    // tslint:disable-next-line:triple-equals

    this.newStudentForm = this.fb.group({
      first_name: ['', [Validators.required]],
      middle_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required]],
      home_address: ['', [Validators.required]],
      gender: ['Male', [Validators.required]],
      father_name: ['', [Validators.required]],
      mother_name: ['', [Validators.required]],
      school_year: [this.activeSchoolYear.id, [Validators.required]],
      department: ['', Validators.required],
      year_level: ['', Validators.required],
    });


  }

  enrollStudent(form: FormGroup) {


    if (form.invalid) { return false; }


    const first_name = form.value.first_name;
    const middle_name = form.value.middle_name;
    const last_name = form.value.last_name;
    const email = form.value.email;
    const birthdate = form.value.birthdate.toISOString();
    const home_address = form.value.home_address;
    const gender = form.value.gender;
    const father_name = form.value.father_name;
    const mother_name = form.value.mother_name;
    const department = form.value.department.id;
    const college = form.value.college || 0;
    const year_level = form.value.year_level;
    const school_year = form.value.school_year;

    this.studentService.registerStudent(
      first_name,
      middle_name,
      last_name,
      email,
      birthdate,
      home_address,
      gender,
      father_name,
      mother_name,
      department,
      college,
      year_level,
      school_year
    ).subscribe(
      (res: any) => {
        this.onRegStudentSuccess.emit(res);

      },
      (err) => this.onRegStudentFailure.emit(err)
      );

    this.dialog.close();
  }

  getSchoolSettings() {
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
        this.initForms();


      }
    );
  }

  checkIfCollegeDepartment(event: MatRadioChange) {
    this.hasSelectedDepartment = true;
    const department: Department = event.value;
    this.yearLevels = department.year_levels;
    this.newStudentForm.patchValue({ year_level: this.yearLevels[0].id });
    if (department.name == 'College') {
      this.isCollege = true;
      this.newStudentForm.addControl('college', new FormControl(this.colleges[0].id, Validators.required));

      return;
    }
    this.isCollege = false;
    this.newStudentForm.removeControl('college');


  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
