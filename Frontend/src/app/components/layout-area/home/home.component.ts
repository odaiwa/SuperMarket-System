import { OrderService } from './../../../services/order.service';
import { Router } from '@angular/router';
import { CartService } from './../../../services/cart.service';
import { ProductsService } from './../../../services/products.service';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from './../../../services/notify.service';
import { UserModel } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import store from 'src/app/redux/store';
import { CartModel } from 'src/app/models/cart.model';
import { OrderModel } from 'src/app/models/order.model';
import { Unsubscribe } from 'redux';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private productsService: ProductsService, private cartService: CartService, private orderService: OrderService, private notify: NotifyService, private router: Router) { }
    public products: ProductModel[] = [];
    public user: UserModel = store.getState().authState.user;
    public cart: any | CartModel = store.getState().cartState.cart;
    public latestOrder: OrderModel;
    public orders: OrderModel[] = [];
    private unsubscribeMe: Unsubscribe;

    async ngOnInit() {
        try {
            this.unsubscribeMe = store.subscribe(async () => {
                this.user = store.getState().authState.user;

                if (this.user?.isAdmin) {
                    this.router.navigateByUrl("/products");
                    return;
                }
                if (this.user) {
                    try {
                        this.cart = await this.cartService.getOpenCartByUserIdAsync(this.user?._id);
                        this.latestOrder = await this.orderService.getLatestOrderAsync(this.user?._id);

                    } catch (err: any) {
                        if (err.status === 403 || err.status === 401) {
                            this.router.navigateByUrl("/logout");
                            return;
                        }
                        this.notify.error(err);
                    }
                }
            });
            if (this.user?.isAdmin) {
                this.router.navigateByUrl("/products");
                return;
            }
            if (this.user) {
                this.latestOrder = await this.orderService.getLatestOrderAsync(this.user?._id);
                this.cart = await this.cartService.getOpenCartByUserIdAsync(this.user?._id);
            }
            this.products = await this.productsService.getAllProductsAsync();
        }
        catch (err: any) {
            if (err.status === 403 || err.status === 401) {
                this.router.navigateByUrl("/logout");
                return;
            }
            this.notify.error(err);
        }
    }

    public async addCart() {
        try {
            const cartToAdd = new CartModel;
            cartToAdd.userId = this.user._id;
            this.cart = await this.cartService.addCartAsync(cartToAdd);
            this.router.navigateByUrl("/products");
        } catch (err: any) {
            if (err.status === 403 || err.status === 401) {
                this.router.navigateByUrl("/logout");
                return;
            }
            this.notify.error(err);
        }
    }
    public handleResumeShopping() {
        this.router.navigateByUrl("/products");
    }
    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

}
