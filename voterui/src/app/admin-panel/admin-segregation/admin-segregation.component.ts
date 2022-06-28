import { Component, OnInit } from '@angular/core';
import { AdminPanelService } from 'src/app/services/admin-panel.service';

@Component({
  selector: 'app-admin-segregation',
  templateUrl: './admin-segregation.component.html',
  styleUrls: ['./admin-segregation.component.css']
})
export class AdminSegregationComponent implements OnInit {

  voters!: {user: string, is_voted: boolean, is_admin: boolean, area: string, status: string}[];
  constructor(private adminPanelService: AdminPanelService) { }

  ngOnInit(): void {

    this.adminPanelService.onAdminSegregation().subscribe({
      
      next: (res) => {
        console.log(res);
        this.voters = res;


      // res.forEach(function(voter) {

      //     if (voter.is_voted == false){
      //       console.log(voter)
      //       this.votersNonVoted.push(voter);
      //     }else{
      //       this.votersVoted.push(voter);
      //     }

      // })

        // for(let voter of res){

        //   if (voter.is_voted == false){
        //     console.log(voter)
        //     this.votersNonVoted.push(voter);
        //   }else{
        //     this.votersVoted.push(voter);
        //   }

        // }

      }

    })

  }

}
