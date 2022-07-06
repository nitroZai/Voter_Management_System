import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAnalyticsComponent } from './admin-panel/admin-analytics/admin-analytics.component';
import { AdminHomeComponent } from './admin-panel/admin-home/admin-home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminPermissionsComponent } from './admin-panel/admin-permissions/admin-permissions.component';
import { AdminSegregationComponent } from './admin-panel/admin-segregation/admin-segregation.component';
import { CandidateAddPostComponent } from './candidate/candidate-add-post/candidate-add-post.component';
import { CandidateCheckPostsComponent } from './candidate/candidate-check-posts/candidate-check-posts.component';
import { CandidateComponent } from './candidate/candidate.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MemberAlreadyVotedComponent } from './memeber-panel/member-already-voted/member-already-voted.component';
import { MemberHomeComponent } from './memeber-panel/member-home/member-home.component';
import { MemberNotVerifiedComponent } from './memeber-panel/member-not-verified/member-not-verified.component';
import { MemberPoliticalCampaignsComponent } from './memeber-panel/member-political-campaigns/member-political-campaigns.component';
import { MemberSuccessComponent } from './memeber-panel/member-success/member-success.component';
import { MemberVotingComponent } from './memeber-panel/member-voting/member-voting.component';
import { MemeberPanelComponent } from './memeber-panel/memeber-panel.component';
import { RegisterComponent } from './register/register.component';
import { LoginPanelService } from './services/login-panel.service';
const routes: Routes = [
  
  { path: 'apiLogin', component: LoginComponent},
  { path: 'apiRegister', component: RegisterComponent},

  { path: 'apiMember', component: MemeberPanelComponent, children: [
    { path: 'apiMemberSuccess', component: MemberSuccessComponent},
    { path: 'apiMemberHome', component: MemberHomeComponent},
    { path: 'apiMemberNotVerified', component: MemberNotVerifiedComponent},
    { path: 'apiMemberVoting', component: MemberVotingComponent},
    { path: 'apiMemberAlreadyVoted', component: MemberAlreadyVotedComponent},
    { path: 'apiMemberPoliticalCampaigns', component: MemberPoliticalCampaignsComponent},
  ]},
  { path: 'apiAdmin', component: AdminPanelComponent, children: 
  [
  {path: 'apiAdminHome', component: AdminHomeComponent},
  {path: 'apiAnalytics', component: AdminAnalyticsComponent},
  {path: 'apiSegregation', component: AdminSegregationComponent},
  {path: 'apiPermissions', component: AdminPermissionsComponent}
  ]
  },{
    path: 'apiCandidateHome', component: CandidateComponent, children: [
      {path: 'apiCandidateAddPost', component: CandidateAddPostComponent},
      {path: 'apiCandidateCheckPost', component: CandidateCheckPostsComponent},
    ]
  },
  {path:"", component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
