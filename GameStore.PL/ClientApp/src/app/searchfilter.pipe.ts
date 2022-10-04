import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

    transform(games: GameModel[], filtertext: string) {

        if (games.length === 0 || filtertext.length <= 3) {
            return games;
        } else {
            
            return games.filter((game) => {
                return (game.title.toLowerCase().includes(filtertext.toLowerCase()))
            });
        }

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
