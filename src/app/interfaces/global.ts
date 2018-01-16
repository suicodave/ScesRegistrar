import { HttpHeaders } from '@angular/common/http';


<<<<<<< HEAD
export const apiUrl = 'https://sces-api.herokuapp.com/api/';
=======
export const apiUrl = 'http://localhost:8000/api/';
>>>>>>> master

export const apiHeaders = new HttpHeaders({
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
});
