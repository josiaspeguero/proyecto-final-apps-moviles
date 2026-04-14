import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSpinner, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonRippleEffect, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonRow, IonCol } from '@ionic/angular/standalone';
import { CatalogService, CatalogVehicle } from 'src/app/services/catalog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSpinner, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonRippleEffect, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonRow, IonCol, CommonModule, FormsModule]
})
export class CatalogPage implements OnInit {
  vehicles: CatalogVehicle[] = [];
  loading = true;

  filters = {
    marca: '',
    modelo: '',
    anio: null,
    precioMin: null,
    precioMax: null
  };

  showFilters = false;

  constructor(private catalogService: CatalogService, private router: Router) { }

  ngOnInit() {
    this.loadCatalog();
  }

  loadCatalog() {
    this.loading = true;
    this.catalogService.getCatalog(this.filters).subscribe({
      next: (data) => {
        this.vehicles = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching catalog', err);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.loadCatalog();
    this.showFilters = false;
  }

  clearFilters() {
    this.filters = {
      marca: '',
      modelo: '',
      anio: null,
      precioMin: null,
      precioMax: null
    };
    this.loadCatalog();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  viewDetail(id: number | string) {
    this.router.navigate(['/catalog-detail'], { queryParams: { id } });
  }
}
