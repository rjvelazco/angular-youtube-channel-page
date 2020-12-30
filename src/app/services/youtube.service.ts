import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Item, YoutubeResponse } from '../models/youtube.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl      = "https://www.googleapis.com/youtube/v3";
  private apikey          = "AIzaSyCe5iX4b-ZKxA2HLlwI6K0mUZSQogqa7Z4";
  private playList        = "UUuaPTYj15JSkETGnEseaFFg";
  public nextPageToken   = '';

  constructor(
    private http: HttpClient
  ) { 

  }

  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('key', this.apikey)
      .set('playlistId', this.playList)
      .set('maxResults', '12')
      .set('pageToken', this.nextPageToken)

    return this.http.get<YoutubeResponse>(url, { params })
      .pipe(
        map(videos => {
          this.nextPageToken = videos.nextPageToken;
          return videos.items;
        }),
        // -- Recibe la data del map anterior
        map(items => items.map(video => video.snippet))
      )
  }


}
