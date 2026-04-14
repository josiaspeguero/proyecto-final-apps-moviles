import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiresService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTires(vehiculo_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}gomas?vehiculo_id=${vehiculo_id}`);
  }

  updateTireStatus(goma_id: number, estado: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('datax', JSON.stringify({
      goma_id,
      estado
    }));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.apiUrl}gomas/actualizar`, body.toString(), { headers });
  }

  registerPuncture(goma_id: number, descripcion: string, fecha: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('datax', JSON.stringify({
      goma_id,
      descripcion,
      fecha
    }));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.apiUrl}gomas/pinchazos`, body.toString(), { headers });
  }
}
