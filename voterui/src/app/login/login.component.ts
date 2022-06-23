import { Component, OnInit, ElementRef, ViewChild, DoCheck } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginModel } from './login.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) { }

  username!: string;
  password!: string;

  onUsernameChange(event: any){
    this.username = (event.target as HTMLInputElement).value;
  }

  onPasswordChange(event: any){
    this.password = (event.target as HTMLInputElement).value;
  }

  onLoginVerification(){

    console.log(this.username)

    const data = {
      username: this.username
      ,password: this.password
    }
    
    this.authService.loginServiceVerification(data).subscribe({
      next:(res)=> {
        console.log(res);
      }
    })

  }

  ngOnInit(): void {

    
  }

}
