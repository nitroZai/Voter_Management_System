import { Component, OnInit } from '@angular/core';
import { AdminPanelService } from 'src/app/services/admin-panel.service';
import { Chart, registerables } from 'node_modules/chart.js';
@Component({
  selector: 'app-admin-segregation',
  templateUrl: './admin-segregation.component.html',
  styleUrls: ['./admin-segregation.component.css']
})
export class AdminSegregationComponent implements OnInit {

  chart:any
  // chart2:any

  voters!: {user: string, is_voted: boolean, is_admin: boolean, area: string, status: string}[];
  constructor(private adminPanelService: AdminPanelService) { }


  ngOnInit(): void {
    this.chart = document.getElementById('myChart')
    // this.chart2 = document.getElementById('myChart2')
    Chart.register(...registerables)
    this.adminPanelService.onAdminSegregation().subscribe({
      
      next: (res) => {
        console.log(res);
        this.voters = res;

        let newChart = this.chart.getContext('2d')
        // let chartLabels = []
        // let chartVotes = []

        let votedCount = 0;
        let nonVotedCount = 0;



        for (let voter of this.voters){
          // if 
          // chartLabels.push(voter)
          // chartVotes.push(voter)
          if (voter.is_voted === true){
            votedCount += 1
          }else { 
            nonVotedCount += 1
          }

          
        }

        const myChart = new Chart(newChart, {
        type: 'bar',
        data: {
            labels: ['Irresponsible', 'Responsible'],
            datasets: [{
                label: 'Total Votes Segregation',
                data: [votedCount, nonVotedCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
            },
            options: {
              maintainAspectRatio:false,
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
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
