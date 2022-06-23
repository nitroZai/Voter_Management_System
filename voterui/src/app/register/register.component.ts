import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  areaData!: {area: string, area_id: number} [];

  constructor(private auth: AuthService, private renderer: Renderer2) { }

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
  @ViewChild('passwordSmallStyle') passwordSmallStyle!: ElementRef;

  @ViewChild('onArea') onArea!: ElementRef

  onUsername(event: any){
    this.username = (event.target as HTMLInputElement).value;
  }

  onEmail(event: any){
    this.email = (event.target as HTMLInputElement).value;
  }


  onPassword(event: any){
    this.password = (event.target as HTMLInputElement).value;
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
      }
    })

  }

}
