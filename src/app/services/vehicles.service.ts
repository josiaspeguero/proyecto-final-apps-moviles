import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  }

  private buildBody(data: any): string {
    const params = new URLSearchParams();
    params.set('datax', JSON.stringify(data));
    return params.toString();
  }

  getVehicles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}vehiculos`);
  }

  createVehicle(data: any, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('datax', JSON.stringify({
      placa: data.placa,
      chasis: data.chasis,
      marca: data.marca,
      modelo: data.modelo,
      anio: data.anio,
      cantidadRuedas: data.cantidadRuedas
    }));
    
    if (file) {
      formData.append('foto', file);
    }
    
    return this.http.post<any>(`${this.baseUrl}vehiculos`, formData);
  }

  getVehicleDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}vehiculos/detalle?id=${id}`);
  }

  updateVehicle(data: any): Observable<any> {
    const body = this.buildBody(data);
    return this.http.post<any>(`${this.baseUrl}vehiculos/editar`, body, this.getOptions());
  }

  uploadVehiclePhoto(id: number, file: File): Observable<any> {
    const formData = new FormData();
    // Por si el backend exige un nombre de campo distinto, proveemos las alternativas comunes o validamos
    formData.append('id', id ? id.toString() : '');
    formData.append('id_vehiculo', id ? id.toString() : '');
    formData.append('vehiculo_id', id ? id.toString() : '');
    formData.append('idVehiculo', id ? id.toString() : '');
    formData.append('vehiculoId', id ? id.toString() : '');
    formData.append('foto', file);
    
    return this.http.post<any>(`${this.baseUrl}vehiculos/foto`, formData);
  }
}
