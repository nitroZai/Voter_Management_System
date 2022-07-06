import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginPanelService } from '../services/login-panel.service';
import { MemberPanelService } from '../services/member-panel.service';

@Component({
  selector: 'app-memeber-panel',
  templateUrl: './memeber-panel.component.html',
  styleUrls: ['./memeber-panel.component.css']
})
export class MemeberPanelComponent implements OnInit {


  constructor(private router: Router, private authService: AuthService, private loginService: LoginPanelService) { }

  username = '';

  ngOnInit(): void {
  }
    onLogout(){
    
      this.authService.apiJWTLogout().subscribe({
        next: (res) => {
          console.log(res);
        }
      })
      this.router.navigate([''])
    
    }  

    onPoliticalCampaigns(){
      this.router.navigate(['apiMember/apiMemberPoliticalCampaigns'])
    }

    onMemberHome(){
      this.authService.apiJWTUser().subscribe({
        next: (response: any) => {
          
          const data = {
            username: response.username
          }

          this.loginService.apiGetVoter(data).subscribe({
            next: (response: any) => {
              if (response.is_voted){
                this.router.navigate(['apiMember/apiMemberAlreadyVoted'])
              }else{
                this.router.navigate(['apiMember/apiMemberHome'])
              }
            }
          })
        }
      })
    }

}
