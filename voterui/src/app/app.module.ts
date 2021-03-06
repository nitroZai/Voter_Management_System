import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MemeberPanelComponent } from './memeber-panel/memeber-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MemberAlreadyVotedComponent } from './memeber-panel/member-already-voted/member-already-voted.component';
import { AdminAnalyticsComponent } from './admin-panel/admin-analytics/admin-analytics.component';
import { AdminPermissionsComponent } from './admin-panel/admin-permissions/admin-permissions.component';
import { AdminSegregationComponent } from './admin-panel/admin-segregation/admin-segregation.component';
import { HomeComponent } from './home/home.component';
import { MemberVotingComponent } from './memeber-panel/member-voting/member-voting.component';
import { AdminHomeComponent } from './admin-panel/admin-home/admin-home.component';
import { MemberNotVerifiedComponent } from './memeber-panel/member-not-verified/member-not-verified.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateAddPostComponent } from './candidate/candidate-add-post/candidate-add-post.component';
import { CandidateCheckPostsComponent } from './candidate/candidate-check-posts/candidate-check-posts.component';
import { MemberPoliticalCampaignsComponent } from './memeber-panel/member-political-campaigns/member-political-campaigns.component';
import { MemberHomeComponent } from './memeber-panel/member-home/member-home.component';
import { HomeinfoComponent } from './home/homeinfo/homeinfo.component';
// import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MemeberPanelComponent,
    AdminPanelComponent,
    MemberAlreadyVotedComponent,
    AdminAnalyticsComponent,
    AdminPermissionsComponent,
    AdminSegregationComponent,
    HomeComponent,
    MemberVotingComponent,
    AdminHomeComponent,
    MemberNotVerifiedComponent,
    CandidateComponent,
    CandidateAddPostComponent,
    CandidateCheckPostsComponent,
    MemberPoliticalCampaignsComponent,
    MemberHomeComponent,
    HomeinfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
