import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
    form: FormGroup = new FormGroup({});
    _genreList : genreCheckbox[];

    getGenres() {
        this._genreList = [
            { id: 1, name: "Strategy", isSelected: false },
            { id: 2, name: "Shooter", isSelected: false },
            { id: 3, name: "Action", isSelected: false },
        ]
    }
    constructor(private fb: FormBuilder, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    }
    onChange() {
        this._genreList.filter(x => x.isSelected == true).map(x=> x.name).join("/").toString();
    }
    ngOnInit() {
        this.getGenres();
    }



    saveDetails(games: { title: string, description: string, price: number, imageUrl: string, genreName : string }) {

        games.genreName = this._genreList.filter(x => x.isSelected == true).map(x => x.name).join("/").toString();
        this.http.post(this.baseUrl + 'api/Game', games).subscribe((res) => console.log(res));
        window.location.reload();
        
    }
}
class genreCheckbox {
    id: number;
    name: string;
    isSelected: boolean;
}
