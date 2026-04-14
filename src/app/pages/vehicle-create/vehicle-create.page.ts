import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class VehicleCreatePage {
  vehicleForm: FormGroup;
  selectedFile: File | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private vehiclesService: VehiclesService,
    private router: Router
  ) {
    this.vehicleForm = this.fb.group({
      placa: ['', Validators.required],
      chasis: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
      cantidadRuedas: [4, [Validators.required, Validators.min(1)]]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.vehicleForm.invalid) return;
    this.loading = true;

    this.vehiclesService.createVehicle(this.vehicleForm.value, this.selectedFile || undefined).subscribe({
      next: () => {
        this.loading = false;
        alert('Vehículo creado con éxito.');
        this.router.navigate(['/vehicles']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al crear vehículo:', err);
        alert('Hubo un error al crear el vehículo.');
      }
    });
  }
}
