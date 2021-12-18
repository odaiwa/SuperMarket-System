import { ItemModel } from './../../../models/item.model';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from './../../../services/notify.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent {

    @Input()
    public cartItem: ItemModel;
    constructor(private notify: NotifyService, private cartService: CartService, private router: Router) { }


    public async deleteItem(_id:string) {
        try {
            await this.cartService.deleteItemAsync(_id);
        } catch (err: any) {
            if(err.status === 403 || err.status === 401) {
                this.router.navigateByUrl("/logout"); 
                return;
            }
            this.notify.error(err);
        }
    }
}
