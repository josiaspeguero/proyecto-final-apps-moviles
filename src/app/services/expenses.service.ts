import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getExpenses(vehiculo_id: number, categoria_id?: string): Observable<any> {
    let query = `?vehiculo_id=${vehiculo_id}`;
    if (categoria_id) {
      query += `&categoria_id=${categoria_id}`;
    }
    return this.http.get(`${this.apiUrl}gastos${query}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}gastos/categorias`);
  }

  createExpense(vehiculo_id: number, categoriaId: number, monto: number, descripcion: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('datax', JSON.stringify({
      vehiculo_id,
      categoriaId,
      monto,
      descripcion
    }));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.apiUrl}gastos`, body.toString(), { headers });
  }
}
