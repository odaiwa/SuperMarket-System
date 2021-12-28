import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { ItemModel } from 'src/app/models/item.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

    public cart: CartModel;
    public user: UserModel;
    public cartItems: ItemModel[] = [];
    public cartTotalPrice = 0;

    constructor(private notify: NotifyService, private cartService: CartService, private router: Router) { }

    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
            this.cart = await this.cartService.getOpenCartByUserIdAsync(this.user?._id);
            this.cartItems = await this.cartService.getItemsByCartIdAsync(this.cart?._id);
            this.cartTotalPrice = this.cartItems?.reduce((sum, item) => sum + item.totalPrice, 0);
            store.subscribe(async () => {
                this.cartItems = store.getState().itemsState.items;
                this.cartTotalPrice = this.cartItems?.reduce((sum, item) => sum + item.totalPrice, 0);
            });

        } catch (err: any) {
            this.notify.error(err.message);
        }
    }

    public async deleteItem(_id: string) {
        try {
            await this.cartService.deleteItemAsync(_id);
        } catch (err: any) {
            if (err.status === 403 || err.status === 401) {
                this.router.navigateByUrl("/logout");
                return;
            }
            this.notify.error(err);
        }
    }

}
