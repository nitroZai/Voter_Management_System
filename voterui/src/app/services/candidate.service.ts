import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8000/'

  onCandidatePost(data: any){
    return this.http.post(this.baseUrl + 'apiCandidateCampaignPost', data)
  }

  onCandidateCheckPost(data: any){
    return this.http.post(this.baseUrl + 'apiCandidateCampaignCheckPost', data)
  }

}
