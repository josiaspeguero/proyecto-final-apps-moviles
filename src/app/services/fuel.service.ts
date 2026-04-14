import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFuel(vehiculo_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}combustibles?vehiculo_id=${vehiculo_id}`);
  }

  createFuel(vehiculo_id: number, tipo: string, cantidad: number, unidad: string, monto: number): Observable<any> {
    const body = new URLSearchParams();
    body.set('datax', JSON.stringify({
      vehiculo_id,
      tipo,
      cantidad,
      unidad,
      monto
    }));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.apiUrl}combustibles`, body.toString(), { headers });
  }
}
