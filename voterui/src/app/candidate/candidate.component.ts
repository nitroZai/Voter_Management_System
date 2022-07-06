import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  constructor(private router: Router, 
    private authService: AuthService) { }

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
  onAddPost(){
    this.router.navigate(['apiCandidateHome/apiCandidateAddPost'])
  }

  onCheckPosts(){
    this.router.navigate(['apiCandidateHome/apiCandidateCheckPost'])
  }

}

