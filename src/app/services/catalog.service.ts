import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface CatalogVehicle {
  id: number | string;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  imagen: string;
}

export interface CatalogDetail extends CatalogVehicle {
  descripcion: string;
  especificaciones: string;
  galeria: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl = environment.apiUrl + 'catalogo';

  constructor(private http: HttpClient) { }

  getCatalog(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    if (filters.marca) params = params.set('marca', filters.marca);
    if (filters.modelo) params = params.set('modelo', filters.modelo);
    if (filters.anio) params = params.set('anio', filters.anio);
    if (filters.precioMin) params = params.set('precioMin', filters.precioMin);
    if (filters.precioMax) params = params.set('precioMax', filters.precioMax);
    
    return this.http.get<any>(this.apiUrl, { params });
  }

  getCatalogDetail(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detalle`, {
      params: { id: id.toString() }
    });
  }
}
