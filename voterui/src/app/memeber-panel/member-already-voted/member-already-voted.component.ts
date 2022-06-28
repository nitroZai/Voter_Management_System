import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-already-voted',
  templateUrl: './member-already-voted.component.html',
  styleUrls: ['./member-already-voted.component.css']
})
export class MemberAlreadyVotedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    
    localStorage.removeItem('userToken');
    this.router.navigate([''])

  }

}
