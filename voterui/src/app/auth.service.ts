import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

  baseUrl = 'http://localhost:8000/'

  getAllAreas(): Observable<any[]>{
      return this.http.get<any[]>(this.baseUrl + 'apiRegister')
  }

  loginServiceVerification(data: any): Observable<any>{ 
    return this.http.post(this.baseUrl + 'apiLogin', data)
  }

  registrationService(data: any): Observable<any[]>{
    return this.http.post<any>(this.baseUrl + 'apiRegister', data)
  }

}
