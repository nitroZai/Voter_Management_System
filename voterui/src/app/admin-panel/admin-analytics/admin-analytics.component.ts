import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';

import { AdminPanelService } from 'src/app/services/admin-panel.service';
import { MemberPanelService } from 'src/app/services/member-panel.service';
// import { Chart } from 'chart.js';
// import { Charts } from 'ng2-charts';
import {Chart, registerables} from 'chart.js'
@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent implements OnInit {

  constructor(private adminPanelService: AdminPanelService, private memberService: MemberPanelService) { }

  candidates!: {candidate_name: string, votes: number, area: string} [];

  
  
  chart:any
  // canvas: any;
  // ctx: any;
  // @ViewChild('myChart') myChart:any;

  ngOnInit(): void {
    this.chart = document.getElementById('myChart')
    Chart.register(...registerables)
    this.adminPanelService.onAdminAdalytics().subscribe({

      next: (res) => {
        this.candidates = res
        console.log(this.candidates)

        let newChart = this.chart.getContext('2d')
        let chartLabels = []
        let chartVotes = []

        for (let candidate of this.candidates){
          chartLabels.push(candidate.candidate_name)
          chartVotes.push(candidate.votes)
        }

        const myChart = new Chart(newChart, {
        type: 'bar',
        data: {
            labels: chartLabels,
            datasets: [{
                label: '# of Votes',
                data: chartVotes,
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


      }

    })

    
  }


  // ngAfterViewInit() {
  //   this.canvas = this.myChart.nativeElement; 
  //   this.ctx = this.canvas.getContext('2d');

  //   new Chart(this.ctx, {
  //     type: 'bar',
  //     data: {
  //         datasets: [{
  //             label: 'Current Vallue',
  //             data: [0, 20, 40, 50],
  //             backgroundColor: "rgb(115 185 243 / 65%)",
  //             borderColor: "#007ee7",
  //         },
  //         {
  //           label: 'Invested Amount',
  //           data: [0, 20, 40, 60, 80],
  //           backgroundColor: "#47a0e8",
  //           borderColor: "#007ee7",
  //       }],
  //         labels: ['January 2019', 'February 2019', 'March 2019', 'April 2019']
  //     },
  // });
  // }

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
