import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { apiUrl, apiHeaders } from '../interfaces/global';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {



  constructor(private http: HttpClient, private router: Router) {

  }


  signIn(email, password) {
    const body = {
      email: email,
      password: password
    };
    return this.http.post(apiUrl + 'users/login', body, {
      headers: apiHeaders,
    });
  }

  signOut() {
    localStorage.removeItem('auth');
    this.router.navigate(['auth']);
  }

  checkToken(): string | boolean {
    const token = localStorage.getItem('auth');
    if (token == null) {
      return false;
    }
    return token;
  }

}
