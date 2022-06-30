import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  areaData!: {area: string, area_id: number} [];

  constructor(private auth: AuthService, private renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {
    this.auth.getAllAreas().subscribe({
      next:(res)=> {
        console.log(res);
        this.areaData = res
        console.log(this.areaData)
      }
    })
  }

  username!: string
  email!: string
  password_confirm!: string
  password!: string
  first_name!: string
  last_name!: string

  passwordSmall!: string
  usernameSmall!: string
  emailSmall!: string

  @ViewChild('passwordSmallStyle') passwordSmallStyle!: ElementRef;

  @ViewChild('emailSmallStyle') emailSmallStyle!: ElementRef;
  @ViewChild('usernameSmallStyle') usernameSmallStyle!: ElementRef;

  @ViewChild('onArea') onArea!: ElementRef

  onUsername(event: any){
    this.username = (event.target as HTMLInputElement).value;

    if ( this.username.length < 3 ){
      this.usernameSmall = "Email doesn't match requirement"
      this.renderer.setStyle(
        this.usernameSmallStyle.nativeElement, 'color', 'red'
      )
    }else{
      this.usernameSmall = "Username matches the requirement"
      this.renderer.setStyle(
        this.usernameSmallStyle.nativeElement, 'color', 'green'
      )
    }

  }

  onFirstname(event: any){
    this.first_name = (event.target as HTMLInputElement).value;
  }

  onLastname(event: any){
    this.last_name = (event.target as HTMLInputElement).value;
  }

  onEmail(event: any){
    this.email = (event.target as HTMLInputElement).value;

    if (this.email.length < 5){
      this.emailSmall = "Username doesn't match requirement"
      this.renderer.setStyle(
        this.emailSmallStyle.nativeElement, 'color', 'red'
      )
    }else{
      this.emailSmall = "Username matches the requirement"
      this.renderer.setStyle(
        this.emailSmallStyle.nativeElement, 'color', 'green'
      )
    }
  }


  onPassword(event: any){
    this.password = (event.target as HTMLInputElement).value;
  
    if (this.password == this.password_confirm){

      this.passwordSmall = "Password Matched!"
      this.renderer.setStyle(
        this.passwordSmallStyle.nativeElement, 'color', 'green'
      )

    }else{

      this.passwordSmall = "Password Mismatch!"
      this.renderer.setStyle(
        this.passwordSmallStyle.nativeElement, 'color', 'red'
      )

    }
  
  }

  onConfirmPassword(event: any){
    this.password_confirm = (event.target as HTMLInputElement).value;

    if (this.password == this.password_confirm){

      this.passwordSmall = "Password Matched!"
      this.renderer.setStyle(
        this.passwordSmallStyle.nativeElement, 'color', 'green'
      )

    }else{

      this.passwordSmall = "Password Mismatch!"
      this.renderer.setStyle(
        this.passwordSmallStyle.nativeElement, 'color', 'red'
      )

    }

  }


  onRegisterSubmit(){

    const data = {

      username: this.username,
      email: this.email,
      area: this.onArea.nativeElement.value,
      password: this.password,
      password_confirm: this.password_confirm,
      first_name: this.first_name,
      last_name: this.last_name,

    }

    this.auth.registrationService(data).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['apiLogin']);
      }
    })

  }

}
