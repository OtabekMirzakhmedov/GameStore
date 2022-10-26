import { Component, OnInit } from '@angular/core';
import { CartService } from '../CartService/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

    private allCartItems : GameModel[] = [];
    private totalAmmount;
    private cartItemsWithQuantity: CartModel[] = [];

    constructor(
        private cartservice: CartService
    ) { }

    ngOnInit() {

        this.cartservice.getProducts().subscribe(data => {
            this.allCartItems = data;

        });
        console.log('her in cartcomponnet', this.allCartItems);
        this.allCartItems.forEach((x) => {
            if (this.cartItemsWithQuantity.some((val) => { return val.game.id === x.id })) {
                this.cartItemsWithQuantity.forEach((k) => {
                    if (k.game.id === x.id) {
                        k.quantity++
                    }
                })
            } else {
                let a: CartModel = {
                    game: undefined,
                    quantity: 0
                };
                a.game = x;
                a.quantity = 1
                this.cartItemsWithQuantity.push(a);
            }
        })
        console.log(this.cartItemsWithQuantity);
    
    }

    // Remove item from cart list
    removeItemFromCart(productId) {
        /* this.cartItems.map((item, index) => {
          if (item.id === productId) {
            this.cartItems.splice(index, 1);
          }
        });
    
        this.mySharedService.setProducts(this.cartItems); */

        this.cartservice.removeProductFromCart(productId);

    }

    emptyCart() {
        this.cartservice.emptryCart();
    }

    decrease(item: CartModel) {
        item.quantity--;
        if (item.quantity < 0) {
            item.quantity = 0;
        }
    }

    increase(item: CartModel) {
        item.quantity++;
    }

    remove(cartitem:CartModel) {
        this.cartItemsWithQuantity.map((item, index) => {
            if (item.game.id === cartitem.game.id) {
                this.cartItemsWithQuantity.splice(index, 1);
            }
        });
    }
    getTotalPrice() {
        let total = 0;

        this.cartItemsWithQuantity.map(item => {
            total += item.game.price*item.quantity;
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

interface CartModel {
    game: GameModel;
    quantity: number;
}
