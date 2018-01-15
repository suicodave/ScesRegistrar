import { Injectable } from '@angular/core';
import { apiHeaders, apiUrl } from '../interfaces/global';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class StudentService {
  private searchedStudentSoure = new BehaviorSubject(null);
  searchResult = this.searchedStudentSoure.asObservable();

  constructor(private authService: AuthService, private http: HttpClient) { }

  getStudents(department_id?, school_year_id?, items = 15, orderBy = 'id', orderValue = 'desc') {
    const params = new HttpParams()
      .set('items', items.toString())
      .set('orderBy', orderBy)
      .set('orderValue', orderValue)
      .set('department_id', department_id)
      .set('school_year_id', school_year_id);
    return this.http.get(apiUrl + 'students', {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });
  }

  deleteStudent(id: number) {
    return this.http.delete(apiUrl + `students/${id}`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),

    });
  }
  getDeletedStudents(items = 15, orderBy = 'id', orderValue = 'desc') {
    const params = new HttpParams()
      .set('items', items.toString())
      .set('orderBy', orderBy)
      .set('orderValue', orderValue);
    return this.http.get(apiUrl + 'students/trashed/index', {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });
  }

  restoreStudent(id: number) {

    return this.http.put(apiUrl + `students/trashed/${id}`, {}, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
    });
  }

  // tslint:disable-next-line:max-line-length
  registerStudent(firstname: string, middlename: string, lastname: string, email: string, birthdate: string, home_address: string, gender: string, father_name: string, mother_name: string, department: number, college: number, year_level: number, school_year: number) {

    const body = {
      first_name: firstname,
      middle_name: middlename,
      last_name: lastname,
      email: email,
      birthdate: birthdate,
      home_address: home_address,
      gender: gender,
      father_name: father_name,
      mother_name: mother_name,
      department_id: department,
      college_id: college,
      year_level_id: year_level,
      school_year_id: school_year
    };
    return this.http.post(apiUrl + `students`, body, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
    });
  }

  searchStudent(query?) {
    if (query == '') {
      return;
    }
    this.searchedStudentSoure.next(query);
  }

  findStudents(items = 15, orderBy = 'id', orderValue = 'desc', query?) {
    const params = new HttpParams()
      .set('items', items.toString())
      .set('orderBy', orderBy)
      .set('orderValue', orderValue)
      .set('search', query);
    return this.http.get(apiUrl + 'students', {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });
  }

}
