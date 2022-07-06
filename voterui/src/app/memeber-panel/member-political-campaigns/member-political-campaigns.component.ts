import { Component, OnInit } from '@angular/core';
import { MemberPanelService } from 'src/app/services/member-panel.service';

@Component({
  selector: 'app-member-political-campaigns',
  templateUrl: './member-political-campaigns.component.html',
  styleUrls: ['./member-political-campaigns.component.css']
})
export class MemberPoliticalCampaignsComponent implements OnInit {

  constructor(private memberPanelService: MemberPanelService) { }

  candidateCampaigns: {candidate: number, message: string, likes:  number, created_at: string} [] = []

  likeBoolean = true;
  dislikeBoolean = false;

  ngOnInit(): void {
    
    this.memberPanelService.onGettingAllCandidatesPosts().subscribe({
        next: (res: any) => {
          for(let item of res){

            this.candidateCampaigns.push(item)

          }
        }
    })

    

    this.givenString = "2022-07-05"
    this.givenYear = Number(this.givenString.substring(0,3))
    this.givenMonth = Number(this.givenString.substring(5,6))
    this.givenDay = Number(this.givenString.substring(8,9))

    
    this.now = new Date()
    this.year = this.now.getFullYear()
    this.months = this.now.getMonth() + 1
    this.days = this.now.getDay() + 1
    this.time = this.now.getTime()
    console.log(this.year, this.months, this.days, this.time)
    

  }

  time!: any
  year!: number
  months!: number
  days!: number
  now!: Date
  givenYear!: number
  givenMonth!: number
  givenDay!: number
  givenString!: string;
  splitString: string [] = [];

  timeConversion(){
    this.givenString = '2022-07-05T05:33:35.688'

    this.splitString = this.givenString.split('T')
    console.log(this.splitString)
  }

  onLike(){

    this.dislikeBoolean = false
    this.likeBoolean = true

  }

  onDisLike(){

    this.dislikeBoolean = true
    this.likeBoolean = false

  }

}
