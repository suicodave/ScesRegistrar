import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { SchoolSettingService } from '../../services/school-setting.service';
import { SchoolYear, Department, College, YearLevel } from '../../interfaces/department';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  studentTypes = [
    'New',
    'Old'
  ];

  newStudentForm: FormGroup;
  isCollege = false;
  colleges: College[];
  departments: Department[];
  schoolYears: SchoolYear[];
  yearLevels: YearLevel[];
  activeSchoolYear: SchoolYear;


  settingsHasLoaded = false;

  constructor(private fb: FormBuilder, private schoolSettingService: SchoolSettingService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getSchoolSettings();
  }

  initForms(event: MatRadioChange) {

    // tslint:disable-next-line:triple-equals
    if (event.value == 'New') {
      this.newStudentForm = this.fb.group({
        first_name: ['', [Validators.required]],
        middle_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        birth_date: ['', [Validators.required]],
        home_address: ['', [Validators.required]],
        gender: ['Male', [Validators.required]],
        father_name: ['', [Validators.required]],
        mother_name: ['', [Validators.required]],
        school_year: [this.activeSchoolYear.id, [Validators.required]],
        department: ['', Validators.required],
        year_level: ['', Validators.required],
      });
    }

  }

  enrollStudent(form: FormGroup) {


    if (form.invalid) { return false; }
    console.log(form.value);

    const first_name = form.value.first_name;
    const middle_name = form.value.middle_name;
    const last_name = form.value.last_name;
    const email = form.value.email;
    const birth_date = form.value.birth_date;
    const home_address = form.value.home_address;
    const gender = form.value.gender;
    const father_name = form.value.father_name;
    const mother_name = form.value.mother_name;
    const school_year = form.value.school_year;
    const college = form.value.college || 0;
    const year_level = form.value.year_level;
    console.log(college);

  }

  getSchoolSettings() {
    this.schoolSettingService.getSchoolYears().subscribe(
      (res: any) => {
        this.schoolYears = res.data;

      }
    );
    this.schoolSettingService.getDepartments().subscribe(
      (res: any) => {
        this.departments = res.data;
      }
    );
    this.schoolSettingService.getColleges().subscribe(
      (res: any) => {
        this.colleges = res.data;
      }
    );

    this.schoolSettingService.getActiveSchoolYear().subscribe(
      (res: any) => {
        this.activeSchoolYear = res.data;
      },
      (err) => { },
      () => {

        this.settingsHasLoaded = true;
      }

    );



  }

  checkIfCollegeDepartment(event: MatRadioChange) {
    const department: Department = event.value;
    this.yearLevels = department.year_levels;
    console.log(this.yearLevels);

    if (department.name == 'College') {
      this.isCollege = true;
      this.newStudentForm.addControl('college', new FormControl(['']));
      return;
    }
    this.isCollege = false;
    this.newStudentForm.removeControl('college');


  }

}
