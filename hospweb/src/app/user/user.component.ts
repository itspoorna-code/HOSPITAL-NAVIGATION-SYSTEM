import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: false,
  
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  constructor(private router: Router) {}
  home(){
    this.router.navigate(['user']);
  }
  search(){
    this.router.navigateByUrl('navigate');
  }
  departments(){
    this.router.navigate(['departments']);
  }
  facility(){
    this.router.navigate(['facility']);
  }
  scan(){
    this.router.navigate(['scanner']);
  }
  emergency(){
    this.router.navigate(['emergency']);
  }
  suggetion(){
    this.router.navigate(['suggestion']);
  }
}
