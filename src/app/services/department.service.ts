import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiHeaders, apiUrl } from '../interfaces/global';

@Injectable()
export class DepartmentService {

  constructor(private authService: AuthService, private http: HttpClient) { }


  getDepartments(items = 15, orderBy = 'id', orderValue = 'desc') {
    const params = new HttpParams()
      .set('items', items.toString())
      .set('orderBy', orderBy)
      .set('orderValue', orderValue);
    return this.http.get(apiUrl + 'departments', {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });
  }
}
