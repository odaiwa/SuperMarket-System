import { AddressModel } from './../../../models/address.model';
import { UserModel } from './../../../models/user.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    public hide = true;
    constructor(private authService: AuthService, private router: Router) { }
    public user = new UserModel();
    public address = new AddressModel();

    public async register() {
        try {
            this.user.address.city = this.address.city;
            this.user.address.street = this.address.street;
            const user = await this.authService.register(this.user);
            console.log("you are registered..."+user);
            // this.router.navigateByUrl("");
        } catch (err) {
            console.log(err);
        }

    }
}
