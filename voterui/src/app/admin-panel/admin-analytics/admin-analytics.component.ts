import { Component, OnInit, Input } from '@angular/core';

import { AdminPanelService } from 'src/app/services/admin-panel.service';
import { MemberPanelService } from 'src/app/services/member-panel.service';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent implements OnInit {

  constructor(private adminPanelService: AdminPanelService, private memberService: MemberPanelService) { }

  candidates!: {candidate_name: string, votes: number, area: string} [];

  ngOnInit(): void {

    this.adminPanelService.onAdminAdalytics().subscribe({

      next: (res) => {
        this.candidates = res
        console.log(this.candidates)
      }

    })

  }

  // @Input() candidates!: {candidate_name: string, votes: number, area: string}[];

  // getAdminAnalyticsData(){

    // this.adminService.onAdminAdalytics().subscribe({
    //   next: (res) => {
        
    //     this.candidates = res
    //     console.log(res)

    //   }
    // })

    // this.memberService.getAllCandidates().subscribe({

    //   next: (res) => {

    //     console.log(res)
    //     this.candidates = res

    //   }

    // })

    // }

}
