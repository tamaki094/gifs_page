import { Component, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search',
  imports: [GifListComponent],
  templateUrl: './search.component.html',
})
export default class SearchComponent {
  gifsService = inject(GifsService);

  onSearch(valor: string) {
    this.gifsService.searchGifs(valor);
    console.log(event);
  }
}
