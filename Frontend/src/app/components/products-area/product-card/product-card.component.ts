import { Component, Input, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartModel } from 'src/app/models/cart.model';
import { ItemModel } from 'src/app/models/item.model';
import { ProductModel } from 'src/app/models/product.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
    
    constructor(private cartService: CartService, private notify: NotifyService) { }
    public imageAddress: string;
    public item : ItemModel = null;
    private unsubscribeMe: Unsubscribe;
    public weight: Boolean = false;
    @Input()
    public product: ProductModel;
    @Input()
    public user: UserModel;
    @Input()
    public cart: CartModel;
    @Input()
    public cartItems: ItemModel[];
    
    async ngOnInit() {
        try {
            this.unsubscribeMe = store.subscribe(async () => {
                this.cartItems = store.getState().itemsState.items;
                this.item = store.getState().itemsState.items.find(i => i.product._id === this.product._id);
            });

            this.item = store.getState().itemsState.items.find(i => i.product._id === this.product._id);
            this.imageAddress = environment.productImagesUrl + this.product.imageName;
        } catch (err: any) {
            this.notify.error(err.message);
        }
    }

    public async handleAddToCart() {
        this.item = new ItemModel();
        this.item.product = this.product;
        this.item.quantity = 1;
        this.item.totalPrice = this.product.price * this.item.quantity;
        this.item.cartId = this.cart._id;
        this.item.productId = this.product._id;
        this.item = await this.cartService.addItemToCartAsync(this.item);
    }

    public async plus() {
        this.item.quantity = this.item.quantity + 1;
        this.item.totalPrice = this.product.price * this.item.quantity;
        await this.cartService.updateItemAsync(this.item);
    }

    public async minus() {
        this.item.quantity = this.item.quantity - 1;
        if (this.item.quantity <= 0) {
            await this.cartService.deleteItemAsync(this.item._id);
            return;
        }
        this.item.totalPrice = this.item.product.price * this.item.quantity;
        await this.cartService.updateItemAsync(this.item);
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

}
