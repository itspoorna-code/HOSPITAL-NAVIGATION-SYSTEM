import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DepartmentsComponent } from './departments/departments.component';
import { FacilityComponent } from './facility/facility.component';
import { ScanComponent } from './scan/scan.component';
import { EmergencyComponent } from './emergency/emergency.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { TargetComponent } from './target/target.component';
import { Target1Component } from './target1/target1.component';
const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'home',component:UserComponent},
  {path:'navigate',component:NavigationComponent},
  {path:'departments',component:DepartmentsComponent},
  { path: 'login', component: LoginComponent },
  {path:'facility',component:FacilityComponent},
  {path:'scanner',component:ScanComponent  },
  {path:'emergency',component:EmergencyComponent},
  {path:'suggestion',component:SuggestionsComponent},
  {path:'target',component:TargetComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'target1',component:Target1Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
