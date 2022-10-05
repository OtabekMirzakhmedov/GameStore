import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
    form: FormGroup = new FormGroup({});
    _genreList: genreCheckbox[];
    @ViewChild('gameform', { static: true}) editform: NgForm;
    public game: GameModel;
    public param: any;
    editmode: boolean = false;

   

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
    constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
@Inject(MAT_DIALOG_DATA) public editData : GameModel    ) {
    }
    onChange() {
        this._genreList.filter(x => x.isSelected == true).map(x=> x.name).join("/").toString();
    }
    ngOnInit() {
        this.getGenres();
        console.log(this.editData);

        if (this.editData) {
            console.log(this.editform);
            setTimeout(() => {
                this.editform.setValue({
                    Action: this.editData.genreName.includes("Action"),
                    Adventure: this.editData.genreName.includes("Adventure"),
                    Other: this.editData.genreName.includes("Other"),
                    Puzzle: this.editData.genreName.includes("Puzzle"),
                    Races: this.editData.genreName.includes("Races"),
                    Rpg: this.editData.genreName.includes("Rpg"),
                    Shooter: this.editData.genreName.includes("Shooter"),
                    Simulation: this.editData.genreName.includes("Simulation"),
                    Strategy: this.editData.genreName.includes("Strategy"),
                    description: this.editData.description,
                    imageUrl: this.editData.imageUrl,
                    price: this.editData.price,
                    title: this.editData.title
                });
            });
            this.editmode = true;
           
        }
    }



    saveDetails(games: { title: string, description: string, price: number, imageUrl: string, genreName : string }) {

        games.genreName = this._genreList.filter(x => x.isSelected == true).map(x => x.name).join("/").toString();

        if (this.editmode) {
            var editgameId = this.editData.id;
            this.http.put<GameModel>(this.baseUrl + 'api/Game/' + this.editData.id, games).subscribe();

        }
        else {
            this.http.post(this.baseUrl + 'api/Game', games).subscribe((res) => console.log(res));
        }
  
        window.location.reload();
        
    }

    

}
class genreCheckbox {
    id: number;
    name: string;
    isSelected: boolean;
}

interface GameModel {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    genreName: string

}
