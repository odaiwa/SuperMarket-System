import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { IncompleteGuard } from 'src/app/services/incomplete.guard';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    constructor(private productsService: ProductsService, private router: Router, private notify: NotifyService) { }
    public product = new ProductModel();
    public categories: CategoryModel[];
    public myForm: FormGroup;
    
    async ngOnInit() {
        try {
            this.categories = await this.productsService.getAllCategoriesAsync();
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }
    
    public async add() {
        try {
            await this.productsService.addProductAsync(this.product);
            IncompleteGuard.canLeave = true;
            const dirtyFormID = 'myForm';
            const resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
            resetForm.reset();
            this.notify.success("מוצר נוסף בהצלחה");
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
    public changeOccurred() {
        IncompleteGuard.canLeave = false;
    }
    
    public setImage(args: Event): void {
        this.product.image = (args.target as HTMLInputElement).files;
    }
    
}
