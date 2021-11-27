import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CredentialsModel } from 'src/app/models/credentials.model';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private authService: AuthService, private router:Router) { }
    public credentials = new CredentialsModel();
    public hide = true;
    public async login() {
        try {
            // console.log(this.credentials);
            await this.authService.login(this.credentials);
            console.log("you are logged in...");
            this.router.navigateByUrl("#");
        } catch (err: any) {
            console.log(err.message);
        }
    }
}
