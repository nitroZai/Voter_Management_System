import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private memberPanelService: MemberPanelService, private router: Router) { }

  user!: string
  userIsVoted = localStorage.getItem('userIsVoted') === 'true' ? true : false;

  ngOnInit(): void {

      
    console.log(localStorage.getItem('userToken'))

    this.memberPanelService.getAllCandidates().subscribe(
      {
        next: (res) => {
          console.log(res)
          this.candidates = res
        }
      }

    )

  }

  onSubmitVoteData(){

    const data = {
      candidateName: this.candidateName.nativeElement.value,
      username: JSON.parse(this.userToken)
    }      

    this.memberPanelService.onVoteSubmit(data).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['apiMember/apiMemberSuccess'])
      }
    })
  }


}
