import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginPanelService } from 'src/app/services/login-panel.service';
import { AuthService } from 'src/app/auth.service';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-candidate-add-post',
  templateUrl: './candidate-add-post.component.html',
  styleUrls: ['./candidate-add-post.component.css']
})
export class CandidateAddPostComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginPanelService, private authService: AuthService, private candidateService: CandidateService) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
  })

  get message() {
    // console.log(this.form.get('message'))
    return this.form.get('message')
  }

  onPostSubmit(){

    this.authService.apiJWTUser().subscribe({

      next: (res: any) => {

        const data = {
          'username': res.username,
          'message': this.form.value.message
        }

        this.candidateService.onCandidatePost(data).subscribe({
          next: (res: any) => {

            console.log('Post is published')

          }
        })

      }

    })

  }

}
