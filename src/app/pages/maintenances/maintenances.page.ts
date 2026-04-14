import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MaintenancesService } from '../../services/maintenances.service';

@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.page.html',
  styleUrls: ['./maintenances.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class MaintenancesPage implements OnInit {
  vehiculoId!: number;
  maintenances: any[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private maintService: MaintenancesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('vehiculo_id');
      if (id) {
        this.vehiculoId = parseInt(id, 10);
        this.loadMaintenances();
      }
    });
  }

  ionViewWillEnter() {
    if (this.vehiculoId) {
      this.loadMaintenances();
    }
  }

  loadMaintenances() {
    this.loading = true;
    this.maintService.getMaintenances(this.vehiculoId).subscribe({
      next: (res) => {
        this.loading = false;
        // Dependiendo de cómo viene el body:
        this.maintenances = res.data || res;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar mantenimientos:', err);
      }
    });
  }
}
