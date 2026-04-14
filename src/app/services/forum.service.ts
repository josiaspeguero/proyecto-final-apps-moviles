import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTopics(): Observable<any> {
    return this.http.get(`${this.apiUrl}foro/temas`);
  }

  getTopicDetail(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}foro/detalle?id=${id}`);
  }

  getMyTopics(): Observable<any> {
    return this.http.get(`${this.apiUrl}foro/mis-temas`);
  }

  createTopic(vehiculo_id: number, titulo: string, descripcion: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('datax', JSON.stringify({
      vehiculo_id,
      titulo,
      descripcion
    }));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.apiUrl}foro/crear`, body.toString(), { headers });
  }

  replyTopic(tema_id: number, contenido: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('datax', JSON.stringify({
      tema_id,
      contenido
    }));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.apiUrl}foro/responder`, body.toString(), { headers });
  }
}
