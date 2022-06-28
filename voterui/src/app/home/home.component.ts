import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'voterui';

  constructor(private router: Router){
    // this.router.navigate(['apiRegister'])
  }

  ngOnInit(): void {
  }
  onRegistrationNavigate(){
    this.router.navigate(['apiRegister'])
  }

  onLoginNavigate(){
    this.router.navigate(['apiLogin'])
  }


}
