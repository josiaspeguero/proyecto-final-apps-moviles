import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenancesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMaintenances(vehiculo_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}mantenimientos?vehiculo_id=${vehiculo_id}`);
  }

  createMaintenance(vehiculo_id: number, tipo: string, costo: number): Observable<any> {
    const body = new URLSearchParams();
    body.set('datax', JSON.stringify({
      vehiculo_id,
      tipo,
      costo
    }));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(`${this.apiUrl}mantenimientos`, body.toString(), { headers });
  }

  getMaintenanceDetail(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}mantenimientos/detalle?id=${id}`);
  }

  uploadMaintenancePhotos(id: number, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('datax', JSON.stringify({
      mantenimiento_id: id
    }));

    // El array de fotos
    files.forEach(file => {
      formData.append('fotos[]', file);
    });

    return this.http.post(`${this.apiUrl}mantenimientos/fotos`, formData);
  }
}
