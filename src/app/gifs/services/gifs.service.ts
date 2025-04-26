import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendigGifsLoading = signal<boolean>(true);

  constructor() {
    this.loadTrendingGifs();
   }

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
 * Busca gifs en Giphy utilizando la API de búsqueda de Giphy.
 * @param query La cadena de búsqueda para encontrar gifs.
 */
  searchGifs(query : string) {
    this.http.get<GiphyResponse>(`${ environment.giphyApiUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query  
      },
    })
    .subscribe((response) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
        console.log(gifs);
        this.trendingGifs.set(gifs);
        this.trendigGifsLoading.set(false);
   })
  }
}
