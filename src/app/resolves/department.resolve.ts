import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DepartmentService } from '../services/department.service';
import { Department } from '../interfaces/department';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';
@Injectable()
export class DepartmentResolver implements Resolve<any> {
    department: Department;
    constructor(
        private departmentService: DepartmentService,
        private authService: AuthService,
        private snackBar: MatSnackBar
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        return this.departmentService.getDepartments().catch(
            (error) => {
                Observable.throw(this.errorHandle(error));
                return Observable.empty();
            }
        );
    }

    errorHandle(err) {
        let message: string;
        if (err.status == 401) {
            message = 'Something went wrong with user session, Please try to relogin.';
        }
        if (err.status == 0) {
            message = 'Conection from server refused. Please contact the administrator';
        }

        this.snackBar.open(message, 'Okay', {
            duration: 5000
        }).afterDismissed().subscribe(
            (res) => {
                this.authService.signOut();
            }

            );


    }
}
