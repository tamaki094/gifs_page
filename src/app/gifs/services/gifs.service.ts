import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map, Observable, tap } from 'rxjs';

const  GIF_KEY = 'gifsHistory';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage) as Record<string, Gif[]>;

  return gifs;
}

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendigGifsLoading = signal<boolean>(true);

  searchingHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchingHisstoryKeys = computed(() => Object.keys(this.searchingHistory()));

  constructor() {
    this.loadTrendingGifs();
   }

   /**
    * Carga el historial de gifs desde el almacenamiento local y lo almacena en la señal searchingHistory.
    * Si no hay historial en el almacenamiento local, se inicializa como un objeto vacío.
    */
   saveGifsToLocalStorage = effect(() => {
      const historyString = JSON.stringify(this.searchingHistory());
      localStorage.setItem(GIF_KEY, historyString);
   });

/**
 * Carga los gifs más populares de Giphy y los almacena en la señal trendingGifs.
 * Utiliza el servicio HttpClient para realizar una solicitud GET a la API de Giphy.
 */
  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${ environment.giphyApiUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20   
      },
    })
    .subscribe((response) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
        console.log(gifs);
        this.trendingGifs.set(gifs);
        this.trendigGifsLoading.set(false);
   })
  }

  /**
   * Realiza una búsqueda de gifs en la API de Giphy utilizando el término de búsqueda proporcionado.
   * @param query - El término de búsqueda para buscar gifs.
   * @returns Un observable que emite la respuesta de la API de Giphy.
   */
  searchGifs(query : string) : Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${ environment.giphyApiUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query  
      },
    })
    .pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

      //Historial
      tap(items =>{
        this.searchingHistory.update((history) => ({
          ...history,
          [query.toLocaleLowerCase()]: items,
        }));
        console.log(this.searchingHistory());
      }) //Se necesita ejecutar un efecto secundario, para eso es tap()
    );
  //   .subscribe((response) => {
  //       const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
  //       console.log(gifs);

  //       return gifs;

  //  })
  }

  getHistoryGifs(query : string) : Gif[]{
    return this.searchingHistory()[query] ?? [];
  }
}
