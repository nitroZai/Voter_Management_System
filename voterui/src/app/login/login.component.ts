import { Component, OnInit, ElementRef, ViewChild, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginPanelService } from '../services/login-panel.service';
import { LoginModel } from './login.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService, 
    private loginService: LoginPanelService,
    private router: Router) { }

  username!: string;
  password!: string;

  onUsernameChange(event: any){
    this.username = (event.target as HTMLInputElement).value;
  }

  onPasswordChange(event: any){
    this.password = (event.target as HTMLInputElement).value;
  }

  onLoginVerification(){

    const data = {
      username: this.username
      ,password: this.password
    }
    
    this.authService.loginServiceVerification(data).subscribe({
      next:(res)=> {
        console.log(res);
        console.log(res.is_voted);
        localStorage.setItem('userToken', JSON.stringify(res.user))
        localStorage.setItem('userIsVoted', JSON.stringify(res.is_voted))

            if(res.is_admin != true){
              if(res.status == 'Pending' || res.status == 'Denied'){
                this.router.navigate(['apiMember/apiMemberNotVerified'])
              }else{
                if (localStorage.getItem('userIsVoted') === 'false'){
                  this.router.navigate(['apiMember/apiMemberVoting'])
                  console.log('fasdfsad')
                }else {
                  this.router.navigate(['apiMember/apiMemberAlreadyVoted'])
                }
              }
            }else{
              this.router.navigate(['apiAdmin/apiAdminHome'])
            }
    
      },
      error: (res) => {
        
        this.router.navigate([''])

      }
    })

  }

  ngOnInit(): void {

    
  }

}
