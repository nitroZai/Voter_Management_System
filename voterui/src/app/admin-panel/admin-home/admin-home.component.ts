import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  @Input() adminName!: string;

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {

    this.authService.apiJWTUser().subscribe({
      next: (res: any) => {

        this.adminName = res.username

      }
    })
    
  }

}
