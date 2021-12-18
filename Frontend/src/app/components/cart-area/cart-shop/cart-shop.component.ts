import { CartService } from './../../../services/cart.service';
import { NotifyService } from './../../../services/notify.service';
import { ItemModel } from './../../../models/item.model';
import { UserModel } from './../../../models/user.model';
import { CartModel } from './../../../models/cart.model';
import { Component, OnInit } from '@angular/core';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-cart-shop',
  templateUrl: './cart-shop.component.html',
  styleUrls: ['./cart-shop.component.css']
})
export class CartShopComponent implements OnInit {

    public cart: CartModel;
    public user: UserModel;
    public cartItems: ItemModel[] = [];
    public cartTotalPrice = 0;

    constructor(private notify: NotifyService, private myCartService: CartService) { }

    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
            this.cart = await this.myCartService.getOpenCartByUserIdAsync(this.user?._id);
            this.cartItems = await this.myCartService.getItemsByCartIdAsync(this.cart?._id);
            console.log("car from orders : "+this.cart);
            this.cartTotalPrice = this.cartItems?.reduce((sum, item) => sum + item.totalPrice, 0);

            store.subscribe(async () => {
                this.cartItems = store.getState().itemsState.items;
                this.cartTotalPrice = this.cartItems?.reduce((sum, item) => sum + item.totalPrice, 0);
            });

        } catch (err: any) {
            this.notify.error(err.message);
        }
    }
}
