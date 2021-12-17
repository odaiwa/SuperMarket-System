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
    public step:number = 1;
   
    public nextpage(){
        this.step = this.step + 1;
        console.log(this.step);
    }

    public previsePage(){
        this.step = this.step - 1;
        console.log(this.step);
    }
    
    public async register() {
        try {
            this.user.address.city = this.address.city;
            this.user.address.street = this.address.street;
            await this.authService.register(this.user);
            console.log("you are registered...");
            // this.router.navigateByUrl("");
        } catch (err) {
            console.log(err);
        }

    }
}
