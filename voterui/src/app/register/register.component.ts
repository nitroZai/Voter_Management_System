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
  confirmPassword!: string
  password!: string

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
  
    if (this.password == this.confirmPassword){

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
    this.confirmPassword = (event.target as HTMLInputElement).value;

    if (this.password == this.confirmPassword){

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
      password: this.password

    }

    this.auth.registrationService(data).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['apiLogin']);
      }
    })

  }

}
