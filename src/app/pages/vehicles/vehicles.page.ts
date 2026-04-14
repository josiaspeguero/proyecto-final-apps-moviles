import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { VehiclesService } from '../../services/vehicles.service';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';

interface Vehicle {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  placa: string;
  fotoUrl?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class VehiclesPage implements OnInit {
  vehicles: Vehicle[] = [];
  loading: boolean = false;

  constructor(private vehiclesService: VehiclesService) {
    addIcons({ addCircleOutline });
  }

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
        this.vehicles = (res.data || res || []) as Vehicle[];
        this.ensureImageUrls();
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar vehículos:', err);
      }
    });
  }

  private ensureImageUrls() {
    this.vehicles = this.vehicles.map(vehicle => {
      if (!vehicle.fotoUrl) {
        vehicle.fotoUrl = 'assets/default-vehicle.svg';
      }
      return vehicle;
    });
  }

  onImageError(event: any) {
    event.target.src = 'assets/default-vehicle.svg';
  }
}
