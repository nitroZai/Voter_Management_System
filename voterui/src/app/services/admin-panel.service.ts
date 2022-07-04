import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  baseUrl = 'http://localhost:8000/'

  constructor(private http: HttpClient) { }

  onAdminAdalytics(): Observable<any[]>{

    return this.http.get<any[]>(this.baseUrl + 'apiAnalytics')

  }
  onAdminSegregation(): Observable<any[]>{

    return this.http.get<any[]>(this.baseUrl + 'apiSegregations')

  }

  onAdminPermission(data: any): Observable<any[]>{

    return this.http.post<any[]>(this.baseUrl + 'apiAdminPermissions', data)

  }

  onAdminUserStatus(data: any): Observable<any[]>{

    return this.http.post<any[]>(this.baseUrl + 'apiAdminUserStatus', data)

  }

  onAdminPermissionSearch(data: any): Observable<any[]>{

    return this.http.post<any[]>(this.baseUrl + 'apiAdminPermissionsSearch', data)

  }

}
