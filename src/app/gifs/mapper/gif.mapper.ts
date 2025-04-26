import { Gif } from "../interfaces/gif.interface";
import { GifphyItem, GiphyResponse } from "../interfaces/giphy.interfaces";

export class GifMapper {
    static mapGiphyItemToGif(giphyItem: GifphyItem): Gif {
        return {
            id: giphyItem.id,
            title: giphyItem.title,
            url: giphyItem.images.original.url,
           
        };
    }

    static mapGiphyItemsToGifArray(giphyItems: GifphyItem[]): Gif[] {
        return giphyItems.map(this.mapGiphyItemToGif);
    }
}