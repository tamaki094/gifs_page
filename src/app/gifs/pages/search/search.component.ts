import { Component, computed, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

{

}

@Component({
  selector: 'app-search',
  imports: [GifListComponent],
  templateUrl: './search.component.html',
})
export default class SearchComponent {
  gifsService = inject(GifsService);
  gifs = signal<Gif[]>([]);


  onSearch(valor: string) {
    this.gifsService.searchGifs(valor)
    .subscribe((response) => {
      this.gifs.set(response);
    });
    console.log(event);
  }
}
