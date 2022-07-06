import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-candidate-check-posts',
  templateUrl: './candidate-check-posts.component.html',
  styleUrls: ['./candidate-check-posts.component.css']
})
export class CandidateCheckPostsComponent implements OnInit {

  constructor(private candidateService: CandidateService, private authService: AuthService) { }

  candidateCampaigns: {candidate: number, message: string, likes:  number, created_at: string} [] = []

  ngOnInit(): void {
    
    this.authService.apiJWTUser().subscribe({

      next: (res: any) => {
        const data = {
          'username': res.username
        }
        this.candidateService.onCandidateCheckPost(data).subscribe({
          next: (res: any) => {

            // const data = {
            //   candidate: res.candidate,
            //   message: res.message,
            //   likes: res.likes,
            //   created_at: String(res.created_at)
            // }
            // console.log(data)
            for(let item of res){

              this.candidateCampaigns.push(item)

            }
              
            // console.log(this.candidateCampaigns)

          }
        })
      }

    })
    
  }



}
