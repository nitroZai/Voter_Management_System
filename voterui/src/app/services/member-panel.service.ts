import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberPanelService {

  baseUrl = 'http://localhost:8000/'

  constructor(private http: HttpClient) { }

  getAllCandidates(): Observable<any[]>{

    return this.http.get<any[]>(this.baseUrl + 'apiAllCandidates')

  }

  onVoteSubmit(data: any): Observable<any>{
    return this.http.post<any>(this.baseUrl + 'apiAllCandidates', data)
  }

  
  onGettingSpecificCandidates(data: any){
    return this.http.post(this.baseUrl + 'apiGetSpecificLocationCandidates' , data)
  }

  onGettingAllCandidatesPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'apiCandidateCampaignPost')
  }
}
