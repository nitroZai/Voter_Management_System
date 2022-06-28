import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminPanelService } from '../services/admin-panel.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router, private adminPanelService: AdminPanelService) { }

  adminName!: string;
  candidates!: {candidate_name: string, votes: number, area: string} [];

  ngOnInit(): void {

    this.adminName = JSON.stringify(localStorage.getItem('userToken'));
    
  }

  onAdminHome(){

    this.router.navigate(['apiAdmin/apiAdminHome'])

  }

  onAnalytics(){
    // this.router.navigate(['apiAnalytics'])
    this.router.navigate(['apiAdmin/apiAnalytics'])
  }

  onPermissions(){

    this.router.navigate(['apiAdmin/apiPermissions'])

  }

  onSegregation(){

    this.router.navigate(['apiAdmin/apiSegregation'])

  }

  onLogout(){

    localStorage.removeItem('userToken');
    this.router.navigate([''])

  }

}
