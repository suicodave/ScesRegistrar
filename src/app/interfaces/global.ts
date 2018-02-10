import { HttpHeaders } from '@angular/common/http';


export const apiUrl = 'https://sces-api.herokuapp.com/api/';

export const apiHeaders = new HttpHeaders({
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
});
