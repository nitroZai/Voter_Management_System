import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken = ''; 

  constructor( private http: HttpClient) { }

  baseUrl = 'http://localhost:8000/'

  getAllAreas(): Observable<any[]>{
      return this.http.get<any[]>(this.baseUrl + 'apiJWTRegister')
  }

  loginServiceVerification(data: any){ 
    return this.http.post(this.baseUrl + 'apiJWTLogin', data, {withCredentials: true})
  }

  registrationService(data: any): Observable<any[]>{
    return this.http.post<any>(this.baseUrl + 'apiJWTRegister', data)
  }

  apiJWTUser() {
    return this.http.get(this.baseUrl + 'apiJWTUser');
  }

  // refresh() {
  //   return this.http.post(`${environment.api}/refresh`, {}, {withCredentials: true});
  // }

  apiJWTLogout() {
    return this.http.post(this.baseUrl + 'apiJWTLogout', {}, {withCredentials: true});
  }

  apiJWTRefresh() {
    return this.http.post(this.baseUrl + 'apiJWTRefresh', {}, {withCredentials: true});
  }

}
