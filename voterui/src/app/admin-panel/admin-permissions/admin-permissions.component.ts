import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminPanelService } from 'src/app/services/admin-panel.service';

@Component({
  selector: 'app-admin-permissions',
  templateUrl: './admin-permissions.component.html',
  styleUrls: ['./admin-permissions.component.css']
})
export class AdminPermissionsComponent implements OnInit {
  voters!: {user: string, is_voted: boolean, is_admin: boolean, area: string, status: string}[];
  constructor(private adminPanelService: AdminPanelService) { }

  adminRightsStatusData!: { is_admin: boolean, voter: string }
  userAccountStatusData!: { status: string, voter: string }

  @ViewChild('adminRights') adminRights!: ElementRef;

  ngOnInit(): void {
  
  this.adminPanelService.onAdminSegregation().subscribe({
      
    next: (res) => {
      console.log(res);
      this.voters = res;
    }

  })

}  
  onSubmitAdmin(event: any, voter: any){

    console.log(voter, (event.target as HTMLInputElement).value, this.adminRights.nativeElement.value)

  }


  onAdminUserStatusSubmit(adminStatusReference: NgForm, voter: any){

    let formRightsData = adminStatusReference.value.statusChange
    console.log(formRightsData)
    let voterTemp = voter.user

    const data = {
      status: formRightsData,
      voter: voterTemp
    }

    this.adminPanelService.onAdminUserStatus(data).subscribe({
      next:(res) => {
        console.log(res)
      }
    })

  }

  onAdminRightsSubmit(adminReference: NgForm, voter: any){

    let formRightsData = adminReference.value.adminRights
    console.log(formRightsData)

    let is_adminBoolean = formRightsData = 'True' ? true : false
    let voterTemp = voter.user

    // console.log(is_adminBoolean)
    // this.adminRightsStatusData.is_admin = is_adminBoolean
    // this.adminRightsStatusData.voter = voterTemp

    
    const data = {
      is_admin: is_adminBoolean,
      voter: voterTemp
    }

    // const data = this.adminRightsStatusData

    this.adminPanelService.onAdminPermission(data).subscribe({
      next: (res)=>{
        console.log(res)
      }
    })
  
  }
  
}
