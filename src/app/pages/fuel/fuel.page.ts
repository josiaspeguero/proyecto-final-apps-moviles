import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FuelService } from '../../services/fuel.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class FuelPage implements OnInit {
  vehiculoId!: number;
  records: any[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private fuelService: FuelService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('vehiculo_id');
      if (id) {
        this.vehiculoId = parseInt(id, 10);
        this.loadFuel();
      }
    });
  }

  ionViewWillEnter() {
    if (this.vehiculoId) {
      this.loadFuel();
    }
  }

  loadFuel() {
    this.loading = true;
    this.fuelService.getFuel(this.vehiculoId).subscribe({
      next: (res) => {
        this.loading = false;
        this.records = res.data || res;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar combustible:', err);
      }
    });
  }
}
