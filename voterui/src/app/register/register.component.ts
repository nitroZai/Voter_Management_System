import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  areaData!: {area: string, area_id: number} [];

  constructor(private auth: AuthService, 
    private renderer: Renderer2,
    private router: Router,
    private formBuilder: FormBuilder) { }

    form = this.formBuilder.group(
      {
        first_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(
          '[a-z]+$'
        )]),
        last_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(
          '[a-z]+$'
        )]),
        username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(
          '[a-z0-9]+$'
        )]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(
          '[a-z0-9]+$'
        )], ),
        password_confirm: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(
          '[a-z0-9]+$'
        )]),
        area: new FormControl('', [Validators.required]),
      }, {
        // validators: this.passwordMatchValidator('password', 'password_confirm')
        validators: this.passwordMatchValidator
      }
    )

    passwordMatchValidator(frm: FormGroup) {
      return frm.controls['password'].value === frm.controls['password_confirm'].value ? null : {'mismatch': true};
    }
    // passwordConfirmation(password: string, password_confirm: string): ValidatorFn {
    //   return (control: AbstractControl): ValidationErrors | null => {
    //     const formGroup = control as FormGroup
    //     const valueOfPassword = formGroup.get(password)?.value
    //     const valueOfPassword_confirm = formGroup.get(password_confirm)?.value

    //     if (valueOfPassword === valueOfPassword_confirm) {
    //       return null
    //     }else {
    //       return {
    //         passwordConfirmation: true
    //       }
    //     }
    //   }
    // }

    // passwordMatchValidator(password: string, confirmPassword: string) {
    //   return (formGroup: FormGroup) => {
    //     const passwordControl = formGroup.controls[password];
    //     const confirmPasswordControl = formGroup.controls[confirmPassword];
  
    //     if (!confirmPasswordControl.errors || !confirmPasswordControl.errors['passwordMismatch']) {
    //       return null;
    //     }
  
    //     // if ( confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch ) {
    //     //   return null;
    //     // }
  
    //     if (passwordControl.value !== confirmPasswordControl.value) {
    //       confirmPasswordControl.setErrors({ passwordMismatch: true });
    //         return true;
    //     } else {
    //       confirmPasswordControl.setErrors(null);
    //         return null;
    //     }
    //   };
    // }

    get f(){
      return this.form.controls
    }

    get first_name(){
      return this.form.get('first_name')
    }
    get last_name(){
      return this.form.get('last_name')
    }
    get username(){
      return this.form.get('username')
    }
    get area(){
      return this.form.get('area')
    }
    get email(){
      return this.form.get('email')
    }
    get password(){
      return this.form.get('password')
    }
    get password_confirm(){
        return this.form.get('password_confirm')
    }

    backendErrorBoolean = false
    backendErrorMessage = ''

    onReactiveFormSubmit(){

      console.log(this.form.value)

      // const data = {

      //       username: this.username,
      //       email: this.email,
      //       area: this.nativeElement.value,
      //       password: this.password,
      //       password_confirm: this.password_confirm,
      //       first_name: this.first_name,
      //       last_name: this.last_name,
      
      //     }
      
          this.auth.registrationService(this.form.value).subscribe({
            next: (res) => {
              console.log(res)
              this.router.navigate(['apiLogin']);
              this.backendErrorBoolean = false;
            }, error: (res) => {
              console.log(res)
              this.backendErrorBoolean = true;
              this.backendErrorMessage = res.error.detail
            }
          })

    }


  ngOnInit(): void {
    this.auth.getAllAreas().subscribe({
      next:(res)=> {
        console.log(res);
        this.areaData = res
        console.log(this.areaData)
      }
    })

    // if (this.submitButtonBoolean === false){
    //   this.renderer.addClass(this.submitbuttonBooleanElement.nativeElement, 'disabled')
    // }else{
    //   this.renderer.addClass(this.submitbuttonBooleanElement.nativeElement, 'disabled')
    // }

  }

  // username!: string
  // email!: string
  // password_confirm!: string
  // password!: string
  // first_name!: string
  // last_name!: string

  // passwordSmall!: string
  // usernameSmall!: string
  // emailSmall!: string

  // @ViewChild('passwordSmallStyle') passwordSmallStyle!: ElementRef;
  // @ViewChild('emailSmallStyle') emailSmallStyle!: ElementRef;
  // @ViewChild('usernameSmallStyle') usernameSmallStyle!: ElementRef;

  // @ViewChild('onArea') onArea!: ElementRef

  // submitButtonBoolean = false;
  // // @ViewChild('submitButtonBooleanElement') submitbuttonBooleanElement!: ElementRef;



  // onUsername(event: any){
  //   this.username = (event.target as HTMLInputElement).value;

  //   if ( this.username.length >= 3 ){

  //     this.usernameSmall = "Username matches the requirement"
  //     this.renderer.setStyle(
  //       this.usernameSmallStyle.nativeElement, 'color', 'green'
  //     )

  //   }else{
  //     // Lowercase
  //     if (this.username === this.username.toLowerCase()){
  //       // No Spaces
  //       if(this.username.search(" ")){
  //         this.usernameSmall = "Username shouldn't have spaces"  
  //       }
        

  //     }else{

  //       this.usernameSmall = "Username needs to be lowercase"

  //     }

  //     // this.usernameSmall = "Email doesn't match requirement"
  //     this.renderer.setStyle(
  //       this.usernameSmallStyle.nativeElement, 'color', 'red'
  //     )      

  //   }

  // }

  // onFirstname(event: any){
  //   this.first_name = (event.target as HTMLInputElement).value;
  // }

  // onLastname(event: any){
  //   this.last_name = (event.target as HTMLInputElement).value;
  // }

  // onEmail(event: any){
  //   this.email = (event.target as HTMLInputElement).value;

  //   if (this.email.length < 5){
  //     this.emailSmall = "Username doesn't match requirement"
  //     this.renderer.setStyle(
  //       this.emailSmallStyle.nativeElement, 'color', 'red'
  //     )
  //   }else{
  //     this.emailSmall = "Username matches the requirement"
  //     this.renderer.setStyle(
  //       this.emailSmallStyle.nativeElement, 'color', 'green'
  //     )
  //   }
  // }


  // onPassword(event: any){
  //   this.password = (event.target as HTMLInputElement).value;
  
  //   if (this.password == this.password_confirm){

  //     this.passwordSmall = "Password Matched!"
  //     this.renderer.setStyle(
  //       this.passwordSmallStyle.nativeElement, 'color', 'green'
  //     )

  //   }else{

  //     this.passwordSmall = "Password Mismatch!"
  //     this.renderer.setStyle(
  //       this.passwordSmallStyle.nativeElement, 'color', 'red'
  //     )

  //   }
  
  // }

  // onConfirmPassword(event: any){
  //   this.password_confirm = (event.target as HTMLInputElement).value;

  //   if (this.password == this.password_confirm){

  //     this.passwordSmall = "Password Matched!"
  //     this.renderer.setStyle(
  //       this.passwordSmallStyle.nativeElement, 'color', 'green'
  //     )

  //   }else{

  //     this.passwordSmall = "Password Mismatch!"
  //     this.renderer.setStyle(
  //       this.passwordSmallStyle.nativeElement, 'color', 'red'
  //     )

  //   }

  // }


  // onRegisterSubmit(){

  //   const data = {

  //     username: this.username,
  //     email: this.email,
  //     area: this.onArea.nativeElement.value,
  //     password: this.password,
  //     password_confirm: this.password_confirm,
  //     first_name: this.first_name,
  //     last_name: this.last_name,

  //   }

  //   this.auth.registrationService(data).subscribe({
  //     next: (res) => {
  //       console.log(res)
  //       this.router.navigate(['apiLogin']);
  //     }
  //   })

  // }

}
