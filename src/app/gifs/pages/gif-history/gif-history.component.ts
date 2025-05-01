import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { GifsService } from '../../services/gifs.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html'
})
export default class GifHistoryComponent {

  gifsService = inject(GifsService);
  // query = inject(ActivatedRoute).params.subscribe((params) => {
  //   console.log( { params } );
  // });

  query = toSignal(inject(ActivatedRoute).params.pipe(
    map(params => params['query']),
  ))

  gifsByKey = computed(() => {
    return this.gifsService.getHistoryGifs(this.query());
  });

}
