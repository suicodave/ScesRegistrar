import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  myForm: FormGroup;
  redirectTo = '';
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.redirectIfAuthenticated();
    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  signIn(form: FormGroup) {
    if (form.invalid) {
      return false;
    }
    const email = form.controls.email.value;
    const password = form.controls.password.value;
    this.authService.signIn(email, password).subscribe(
      (res: any) => {
        localStorage.setItem('auth', res.token);
        this.router.navigate(['/home']);
      },
      (err) => {
        if ('message' in err.error) {
          this.snackBar.open(err.error.message, 'Okay', {
            duration: 3000
          });
        }
      }
    );



  }

  redirectIfAuthenticated() {
    this.route.queryParams
      .filter(params => params.lastVisit)
      .subscribe(
      (params) => {
        this.redirectTo = params.lastVisit;
      }
      );

    const token = this.authService.checkToken();
    if (token != null) {
      this.router.navigate([this.redirectTo]);
    }
  }
}
