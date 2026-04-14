import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MaintenancesService } from '../../services/maintenances.service';

@Component({
  selector: 'app-maintenance-detail',
  templateUrl: './maintenance-detail.page.html',
  styleUrls: ['./maintenance-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MaintenanceDetailPage implements OnInit {
  maintenanceId!: number;
  vehiculoId!: number;
  maintenance: any = null;
  loading = false;
  uploading = false;

  constructor(
    private route: ActivatedRoute,
    private maintService: MaintenancesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.maintenanceId = parseInt(id, 10);
        this.loadDetail();
      }
    });
  }

  loadDetail() {
    this.loading = true;
    this.maintService.getMaintenanceDetail(this.maintenanceId).subscribe({
      next: (res) => {
        this.loading = false;
        this.maintenance = res.data || res;
        this.vehiculoId = this.maintenance.vehiculo_id || this.maintenance.idVehiculo;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar detalle:', err);
      }
    });
  }

  onFilesSelected(event: any) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileList: File[] = Array.from(files);
    
    this.uploading = true;
    this.maintService.uploadMaintenancePhotos(this.maintenanceId, fileList).subscribe({
      next: () => {
        this.uploading = false;
        alert('Fotos subidas correctamente.');
        this.loadDetail();
      },
      error: (err) => {
        this.uploading = false;
        console.error('Error al subir fotos:', err);
        alert('Hubo un problema al subir las fotos.');
      }
    });
  }
}
