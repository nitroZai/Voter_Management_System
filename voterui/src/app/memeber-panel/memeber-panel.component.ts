import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MemberPanelService } from '../services/member-panel.service';

@Component({
  selector: 'app-memeber-panel',
  templateUrl: './memeber-panel.component.html',
  styleUrls: ['./memeber-panel.component.css']
})
export class MemeberPanelComponent implements OnInit {


  constructor(private memberPanelService: MemberPanelService, private router: Router) { }

  ngOnInit(): void {
  }
    onLogout(){
     
        localStorage.removeItem('userToken')
        this.router.navigate([''])

    }  

}
