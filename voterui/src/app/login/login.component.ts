import { Component, OnInit, ElementRef, ViewChild, DoCheck } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  // username!: any;
  // password!: string;

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-z0-9]+$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-z0-9@%$]+$')]) 
  })

  get username() {
    return this.form.get('username')
  }

  get password() {
    return this.form.get('password')
  }

  backendErrorBoolean = false
  backendErrorMessage = ''

  // onUsernameChange(event: any){
  //   this.username = (event.target as HTMLInputElement).value;
  // }

  // onPasswordChange(event: any){
  //   this.password = (event.target as HTMLInputElement).value;
  // }

  onLoginVerification(){

    const data = {
      username: this.form.value.username
      ,password: this.form.value.password
    }

    console.log(data)
    
    this.authService.loginServiceVerification(data).subscribe({
      next:(res: any)=> {
        this.authService.accessToken = res.token
        console.log(res);

        this.authService.apiJWTUser().subscribe({
          next: (res: any)=> {
            this.backendErrorBoolean = false;
            const data = {
              username: res.username
            }

            this.loginService.apiGetVoter(data).subscribe({
                next: (res: any)=> {
                  console.log(res)
                  
                  if(res.is_admin != true){
                    if( res.is_candidate != true){
                      if(res.status == 'Pending' || res.status == 'Denied'){
                        this.router.navigate(['apiMember/apiMemberNotVerified'])
                      }else{
                        if (res.is_voted === false){
                          this.router.navigate(['apiMember/apiMemberVoting'])
                          console.log('fasdfsad')
                        }else {
                          this.router.navigate(['apiMember/apiMemberAlreadyVoted'])
                        }
                      }
                    }else{
                      this.router.navigate(['apiCandidateHome/'])
                    }
                  }
                  // }else if (res.is_candidate == true){
                  //   this.router.navigate(['apiCandidateHome/'])
                  // }
                  else{
                    this.router.navigate(['apiAdmin/apiAdminHome'])
                  }
      
                }
            })
          }
        })
    
      },
      error: (res) => {
        this.backendErrorBoolean = true;
        this.backendErrorMessage = res.error.detail
      }
    })

  }

  ngOnInit(): void {

    
  }

}
