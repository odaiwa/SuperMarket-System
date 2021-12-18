import { NotifyService } from './../../../services/notify.service';
import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import store from 'src/app/redux/store';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private authService: AuthService, private router: Router, private notify: NotifyService) { }
    public credentials = new CredentialsModel();
    public hide = true;
    public async login() {
        try {
            console.log(this.credentials);
            await this.authService.login(this.credentials);
            this.notify.success("you're logged in")
            if (store.getState().authState.user.isAdmin == 1)
                this.router.navigateByUrl("/products-list");
            else
                this.router.navigateByUrl("/home");


        } catch (err: any) {
            this.notify.error(err);
            console.log(err.message);
        }
    }
}
