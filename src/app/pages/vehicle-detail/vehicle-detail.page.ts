import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule]
})
export class VehicleDetailPage implements OnInit {
  vehicle: any = null;
  loading: boolean = false;
  saving: boolean = false;
  editForm: FormGroup;
  vehicleId!: number;

  constructor(
    private route: ActivatedRoute,
    private vehiclesService: VehiclesService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1900)]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.vehicleId = parseInt(id, 10);
        this.loadDetail();
      }
    });
  }

  loadDetail() {
    this.loading = true;
    this.vehiclesService.getVehicleDetail(this.vehicleId).subscribe({
      next: (res) => {
        this.loading = false;
        const data = res.data || res;
        this.vehicle = data;
        this.editForm.patchValue({
          marca: data.marca,
          modelo: data.modelo,
          anio: data.anio
        });
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar detalle:', err);
        alert('Hubo un error cargando el vehículo.');
      }
    });
  }

  onSave() {
    if (this.editForm.invalid) return;
    this.saving = true;

    const updateData = {
      id: this.vehicleId,
      marca: this.editForm.value.marca,
      modelo: this.editForm.value.modelo,
      anio: this.editForm.value.anio
    };

    this.vehiclesService.updateVehicle(updateData).subscribe({
      next: () => {
        this.saving = false;
        alert('Vehículo actualizado exitosamente.');
      },
      error: (err) => {
        this.saving = false;
        console.error('Error al editar:', err);
        alert('No se pudo actualizar el vehículo.');
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Tomarlo automáticamente del objeto cargado o del param
    const idToUse = this.vehicle?.id || this.vehicle?.idVehiculo || this.vehicleId;

    if (!idToUse) {
       alert('Error interno: No se pudo determinar el ID del vehículo automáticamente.');
       return;
    }

    this.vehiclesService.uploadVehiclePhoto(idToUse, file).subscribe({
      next: () => {
        alert('Foto actualizada correctamente.');
        this.loadDetail(); // recargar para mostrar la imagen actualizada
      },
      error: (err) => {
        console.error('Error al subir foto de vehículo:', err);
        alert('No se pudo subir la foto.');
      }
    });
  }
}
