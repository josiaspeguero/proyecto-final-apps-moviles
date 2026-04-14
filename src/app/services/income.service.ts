import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getIncome(vehiculo_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}ingresos?vehiculo_id=${vehiculo_id}`);
  }

  createIncome(vehiculo_id: number, monto: number, concepto: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('datax', JSON.stringify({
      vehiculo_id,
      monto,
      concepto
    }));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.apiUrl}ingresos`, body.toString(), { headers });
  }
}
