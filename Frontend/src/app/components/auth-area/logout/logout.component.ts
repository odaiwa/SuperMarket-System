// import { NotifyService } from './../../../services/notify.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  template: ""
})
export class LogoutComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigateByUrl("home");
    console.log("you're logged out")
  }

}
