import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DepartmentsComponent } from './departments/departments.component';
import { FacilityComponent } from './facility/facility.component';
import { ScanComponent } from './scan/scan.component';
import { EmergencyComponent } from './emergency/emergency.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { TargetComponent } from './target/target.component';
import { HttpClientModule } from '@angular/common/http';
import { Target1Component } from './target1/target1.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    HomeComponent,
    NavigationComponent,
    DepartmentsComponent,
    FacilityComponent,
    ScanComponent,
    EmergencyComponent,
    SuggestionsComponent,
    QrScannerComponent,
    TargetComponent,
    Target1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
