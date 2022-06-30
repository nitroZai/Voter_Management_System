import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-member-already-voted',
  templateUrl: './member-already-voted.component.html',
  styleUrls: ['./member-already-voted.component.css']
})
export class MemberAlreadyVotedComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  name = '';

  ngOnInit(): void {
  
    this.authService.apiJWTUser().subscribe({
      next: (res: any) => {
        this.name = res.first_name
      }
    })
  
  }

  onLogout(){
    
    this.authService.apiJWTLogout().subscribe({
      next: (res) => {
        console.log(res);
      }
    })
    this.router.navigate([''])

  }

}
