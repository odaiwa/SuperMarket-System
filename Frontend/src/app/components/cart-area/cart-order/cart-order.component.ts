import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { ItemModel } from 'src/app/models/item.model';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-cart-order',
    templateUrl: './cart-order.component.html',
    styleUrls: ['./cart-order.component.css']
})
export class CartOrderComponent implements OnInit {

    public order = new OrderModel;
    public items: ItemModel[] = [];
    public cart: CartModel;
    public user: UserModel;
    public imageAddress: string;
    public orderPrice = 0;
    public delivery:String = undefined;
    public city:String = undefined;
    public street:String = undefined;
    public today = new Date().toISOString().split('T')[0];
    
    constructor(private notify: NotifyService, private cartService: CartService, private orderService: OrderService, private router: Router) { }

    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
            this.cart = await this.cartService.getOpenCartByUserIdAsync(this.user._id);
            this.items = await this.cartService.getItemsByCartIdAsync(this.cart._id);
            this.orderPrice = this.items?.reduce((sum, item) => sum + item.totalPrice, 0);
            this.imageAddress = environment.productImagesUrl;

        } catch (err: any) {
            if (err.status === 403 || err.status === 401) {
                this.notify.error("בוצעה יציאה מהמערכת");
                this.router.navigateByUrl("/logout");
                return;
            }
            this.notify.error(err);
        }
    }

    public async addOrder() {
        try {
            this.order.cartId = this.cart._id;
            this.order.userId = this.user._id;
            this.order.price = this.orderPrice;

                this.order = await this.orderService.addOrderAsync(this.order);
                this.cart = await this.cartService.cartIsPaid(this.cart);
                this.delivery = this.order.deliveryDate.toString().split('T')[0];
                this.notify.success("תשלום בוצע בהצלחה!");
                this.generateReceptionPdf();
                this.router.navigateByUrl("/home");
            
        } catch (err: any) {
            this.notify.error(err);
        }
    }
    public cityAddress(value:any){
        this.city = value;
    }
    public streetAddress(value:any){
        this.street = value;
    }
    public deliveryDate(value:any){
        this.delivery = value;
    }
    public async generateReceptionPdf() {
        console.log(this.delivery);
        let element = document.getElementById("content");
        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgHeight = canvas.height * 200 / canvas.width;
            pdf.addImage(imgData, 0, 20, 208,imgHeight);
            setTimeout(()=>{
                this.downloadReception(pdf);
            },1000)
        })
    }

    public downloadReception(pdf:jsPDF){
        pdf.save("קבלה ללקוח _ "+this.user.firstName+" "+this.user.lastName+".pdf");
    }

    public continueShopping() {
        this.router.navigateByUrl("/products");
    }

    public async deleteItem(_id: string) {
        try {
            await this.cartService.deleteItemAsync(_id);
        } catch (err: any) {
            this.notify.error(err);
        }
    }

    public searchProducts(event: Event) {
        const searchWord = (event.target as HTMLInputElement).value.toLowerCase();
        this.items = store.getState().itemsState.items.filter(i => i.product.name.toLowerCase().includes(searchWord));
    }

}
