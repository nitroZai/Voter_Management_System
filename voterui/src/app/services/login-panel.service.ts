import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginPanelService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8000/'


  checkingAdminOrNot(data: any): Observable<any>{
    return this.http.post(this.baseUrl + 'apiLoginCheck', data)
  }

  apiGetVoter(data: any){
    return this.http.post(this.baseUrl + 'apiGetVoter', data)
  }

}
