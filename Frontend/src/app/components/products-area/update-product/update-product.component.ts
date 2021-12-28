import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

    public product = new ProductModel(); 

    public categories: CategoryModel[];
    constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService, private router: Router, private notify: NotifyService) { }

    public setImage(args: Event): void {
        this.product.image = (args.target as HTMLInputElement).files;
    }

    async ngOnInit() {
        try {
            this.product._id = this.activatedRoute.snapshot.params.id;
            this.product = await this.productsService.getOneProductAsync(this.product._id);
            this.categories = await this.productsService.getAllCategoriesAsync();
        }
        catch (err: any) {
            if (err.status === 403 || err.status === 401) {
                this.router.navigateByUrl("/logout");
                return;
            }
            this.notify.error(err.message);
        } 
    } 

    public async update() {
        try {
            await this.productsService.updateProductAsync(this.product);
            this.notify.success("מוצר עודכן בהצלחה");
            this.router.navigateByUrl("/products");
        }
        catch (err: any) {
            if (err.status === 403 || err.status === 401) {
                this.router.navigateByUrl("/logout");
                return;
            }
            this.notify.error(err);
        }
    }

}
