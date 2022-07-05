import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { LoginPanelService } from 'src/app/services/login-panel.service';
import { MemberPanelService } from 'src/app/services/member-panel.service';

@Component({
  selector: 'app-member-voting',
  templateUrl: './member-voting.component.html',
  styleUrls: ['./member-voting.component.css']
})
export class MemberVotingComponent implements OnInit {

  @ViewChild('candidateName') candidateName!: ElementRef;
  candidates!: { candidate_name: string, votes: number, area: number } []
  selectedCandidateName!: {candidateName: string};
  userToken: any = localStorage.getItem('userToken');

  constructor(private memberPanelService: MemberPanelService, private router: Router, private authService: AuthService, private loginService: LoginPanelService) { }

  user!: string
  userIsVoted = localStorage.getItem('userIsVoted') === 'true' ? true : false;

  ngOnInit(): void {

    // console.log(localStorage.getItem('userToken'))

    // this.memberPanelService.getAllCandidates().subscribe(
    //   {
    //     next: (res) => {
    //       console.log(res)
    //       this.candidates = res
    //     }
    //   }

    // )
    this.authService.apiJWTUser().subscribe({
      next: (res: any) => {
        const data = {
          'user': res.username
        }
    
        this.memberPanelService.onGettingSpecificCandidates(data).subscribe({
          next: (res: any) => {
            this.candidates = res
          }
        })
      }
    })
    

  }

  onSubmitVoteData(){

  this.authService.apiJWTUser().subscribe({
    next: (res: any) => {

      const data = {
        candidateName: this.candidateName.nativeElement.value,
        username: res.username
      }
    
      this.memberPanelService.onVoteSubmit(data).subscribe({
        next: (res) => {
          console.log(res)
          this.router.navigate(['apiMember/apiMemberSuccess'])
        }
      })
    }
  })

    
  }


}
