import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';;
import { BehaviorSubject } from 'rxjs';;

@Injectable({
  providedIn: 'root'
})
export class CartService {
    public cartItems : GameModel[] = [];
    public products = new BehaviorSubject<any>([]);
    constructor() { }

    getProducts(): Observable<any> {
        console.log('this.cartItems :', this.cartItems);
        return this.products.asObservable();
    }

    setProducts(products) {
        this.cartItems.push(...products);
        this.products.next(products);
    }

    // Add single product to the cart
    addProductToCart(product) {
        this.cartItems.push(product);
        this.products.next(this.cartItems);
        console.log(this.products);
    }

    // Remove single product from the cart
    removeProductFromCart(productId) {
        this.cartItems.map((item, index) => {
            if (item.id === productId) {
                this.cartItems.splice(index, 1);
            }
        });

        // Update Observable value
        this.products.next(this.cartItems);
    }

    // Remove all the items added to the cart
    emptryCart() {
        this.cartItems.length = 0;
        this.products.next(this.cartItems);
    }

    // Calculate total price on item added to the cart
    getTotalPrice() {
        let total = 0;

        this.cartItems.map(item => {
            total += item.price;
        });

        return total
    }

}



interface GameModel {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    genreName: string

}
