import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MemberPanelService } from '../services/member-panel.service';

@Component({
  selector: 'app-memeber-panel',
  templateUrl: './memeber-panel.component.html',
  styleUrls: ['./memeber-panel.component.css']
})
export class MemeberPanelComponent implements OnInit {


  constructor(private router: Router, private authService: AuthService) { }

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

}
