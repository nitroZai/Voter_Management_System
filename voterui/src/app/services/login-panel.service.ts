import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginPanelService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8000/'


  checkingAdminOrNot(data: string): Observable<any>{
    return this.http.post(this.baseUrl + 'apiLoginCheck', data)
  }

}
