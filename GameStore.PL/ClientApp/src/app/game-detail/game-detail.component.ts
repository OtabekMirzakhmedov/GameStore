
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
    public game: GameModel;
    public param: any;
    constructor(private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

        route.params.subscribe(p => {
            this.param = p["id"];
            this.http.get<GameModel>(baseUrl + 'api/Game/games/' + this.param).subscribe(response => {
                this.game = response;
                console.log(response);
            }
            )
        })
    }
    
    ngOnInit() { }

}

interface GameModel {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    genreName: string

}
