import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { CategoryModel } from 'src/app/models/category.model';
import { ItemModel } from 'src/app/models/item.model';
import { ProductModel } from 'src/app/models/product.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    public products: ProductModel[];
    public product = new ProductModel;
    public categories: CategoryModel[];
    public selectedCategory: string;
    public user: UserModel;
    public cart: CartModel;
    public items: ItemModel[];
    
    constructor(private productsService: ProductsService, private router: Router, private notify: NotifyService, private cartService: CartService) { }

    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
            this.categories = await this.productsService.getAllCategoriesAsync();
            if(!this.user.isAdmin){
                this.cart = await this.cartService.getOpenCartByUserIdAsync(this.user?._id);
            }
            if (this.cart) {
                this.items = await this.cartService.getItemsByCartIdAsync(this.cart?._id);
            }
            this.products = await this.productsService.getAllProductsAsync();
        }
        catch (err: any) {
            if (err.status === 403 || err.status === 401) {
                this.router.navigateByUrl("/logout");
                return;
            }
            this.notify.error(err.message);
        }
    }
    
    public async allProducts(){
        this.products = await this.productsService.getAllProductsAsync();
    }

    public async showProducts(args: Event) {
        try {
            const categoryId = (args.target as HTMLSelectElement).value;
            this.products = store.getState().productsState.products.filter(p => p.categoryId === categoryId);
        } catch (err: any) {
            this.notify.error(err.message);
        }
    }
    
    public searchProducts(event: Event) {
        const searchWord = (event.target as HTMLInputElement).value.toLowerCase();
        this.products = store.getState().productsState.products.filter(p => p.name.toLowerCase().includes(searchWord));
    }

}
