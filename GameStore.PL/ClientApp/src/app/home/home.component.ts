import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddGameComponent } from '../add-game/add-game.component';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../CartService/cart.service';


 
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home-component.css']
})
export class HomeComponent {
    public games: GameModel[];
    status: string;
    form: FormGroup = new FormGroup({});
    _genreList: genreCheckbox[];
    searchText: string = '';
    addedProducts: any[];

    getGenres() {
        this._genreList = [
            { id: 1, name: "Strategy", isSelected: false },
            { id: 2, name: "Shooter", isSelected: false },
            { id: 3, name: "Action", isSelected: false },
            { id: 4, name: "Rpg", isSelected: false },
            { id: 5, name: "Races", isSelected: false },
            { id: 6, name: "Adventure", isSelected: false },
            { id: 7, name: "Puzzle", isSelected: false },
            { id: 8, name: "Simulation", isSelected: false },
            { id: 9, name: "Other", isSelected: false }
        ]
    }
    loggedIn() {
        if (localStorage.getItem('userStatus') === 'success') {
            return true;
        }
    }

    gamesTempArray: any = [];
    getGames() {
        this.http.get<GameModel[]>(this.baseUrl + 'api/game').subscribe(result => {
            this.games = result;
        }, error => console.error(error));
        this.http.get<GameModel[]>(this.baseUrl + 'api/game').subscribe(result => {
            this.gamesTempArray = result;
        }, error => console.error(error));

    }

    constructor(private _formBuilder: FormBuilder, private router: Router,
        private actRoute: ActivatedRoute, private dialog: MatDialog, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
        private cartservice: CartService) {

        
    }
    onCreate() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;

        this.dialog.open(AddGameComponent, dialogConfig);


    }

    tempArray: any = [];
    newArray: any = [];
    arrays: any = [];
    checkboxgenrelist: genreCheckbox[] = [];
    tempCheckbox: genreCheckbox;
    onChange(event: any) {
        console.log(event.target.checked);
        if (this._genreList.filter(x => x.isSelected == true).length > 0) {
            this.tempArray = [];
            this.newArray = [];

            this.checkboxgenrelist = this._genreList.filter(x => x.isSelected == true);
            console.log(this.checkboxgenrelist);

            /*console.log(this._genreList.filter(x => x.isSelected == true).map(x => x.name).join("/").toString());*/

            for (let i = 0; i < this.checkboxgenrelist.length; i++) {
                this.tempArray = this.gamesTempArray.filter((e: any) => !(e.genreName.indexOf(this.checkboxgenrelist[i].name)));
                this.newArray.push(this.tempArray);
            }

   /*         this.tempArray = this.gamesTempArray.filter((e: any) => !(e.genreName.indexOf(event.target.value)));*/
            console.log(this.tempArray);
            
            console.log(this.newArray);
            this.games = [];

            for (let i = 0; i < this.newArray.length; i++) {
                var firstarray = this.newArray[i];
                for (let j = 0; j < firstarray.length; j++) {
                    var obj = firstarray[j];
                    this.games.push(obj);
                }
            }

        } else {
            this.games = this.gamesTempArray;
            this.tempArray = [];
            this.newArray = [];
        }
        //else {
        //    this.tempArray = this.games.filter((e: any) => (e.genreName.indexOf(event.target.value)));
        //    this.newArray = [];
        //    this.newArray.push(this.tempArray);
        //    this.games = [];

        //    for (let i = 0; i < this.newArray.length; i++) {
        //        var firstarray = this.newArray[i];
        //        for (let j = 0; j < firstarray.length; j++) {
        //            var obj = firstarray[j];
        //            this.games.push(obj);
        //        }
        //    }
        //}
        
    }

    
    ngOnInit() {
        this.getGenres();
        this.getGames();
        this.cartservice.getProducts().subscribe(data => {
            this.addedProducts = data;
        })
        console.log(this.addedProducts);

    }

    showinfo(game: GameModel) {
        this.router.navigate([this.baseUrl+'/games/'+ game.id]);
    }
    Delete(game: GameModel) {
        console.log(game);
        this.http.delete(this.baseUrl + 'api/Game/' + game.id).subscribe(() => this.status = 'Delete successful');
        window.location.reload();
    }

    Edit(game: GameModel) {
        const dialogConfigedit = new MatDialogConfig();

        dialogConfigedit.disableClose = false;
        dialogConfigedit.autoFocus = true;

        this.dialog.open(AddGameComponent, {
            data: game
        });
    }

    addToCart(g: GameModel) {
        this.cartservice.addProductToCart(g);
      

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

class genreCheckbox {
    id: number;
    name: string;
    isSelected: boolean;
}

interface CartModel {
    game: GameModel;
    quantity: number;
}
