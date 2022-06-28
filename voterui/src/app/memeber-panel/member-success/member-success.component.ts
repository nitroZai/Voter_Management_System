import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-success',
  templateUrl: './member-success.component.html',
  styleUrls: ['./member-success.component.css']
})
export class MemberSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(){
     
    localStorage.removeItem('userToken')
    this.router.navigate([''])

}  

}
