import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { VehiclesService } from '../../services/vehicles.service';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class VehiclesPage implements OnInit {
  vehicles: any[] = [];
  loading: boolean = false;

  constructor(private vehiclesService: VehiclesService) {
    addIcons({ addCircleOutline });
  }

  // Se usa ionViewWillEnter para recargar la lista siempre que se entra a la página
  ionViewWillEnter() {
    this.loadVehicles();
  }

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.loading = true;
    this.vehiclesService.getVehicles().subscribe({
      next: (res) => {
        this.loading = false;
        // La API puede devolver la data en un arreglo directo o dentro de res.data
        this.vehicles = res.data || res || [];
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar vehículos:', err);
      }
    });
  }
}
