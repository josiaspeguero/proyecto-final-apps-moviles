import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Video {
  id?: number | string;
  youtubeId: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  url: string;
  thumbnail: string;
}

interface ApiResponse {
  success: boolean;
  data: Video[];
}

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private apiUrl = environment.apiUrl + 'videos';

  constructor(private http: HttpClient) { }

  getVideos(): Observable<Video[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => response.data || [])
    );
  }
}
