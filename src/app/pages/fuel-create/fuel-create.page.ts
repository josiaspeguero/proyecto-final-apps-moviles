import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FuelService } from '../../services/fuel.service';

@Component({
  selector: 'app-fuel-create',
  templateUrl: './fuel-create.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class FuelCreatePage implements OnInit {
  vehiculoId!: number;
  fuelForm: FormGroup;
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private fuelService: FuelService
  ) {
    this.fuelForm = this.fb.group({
      tipo: ['combustible', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0.1)]],
      unidad: ['galones', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('vehiculo_id');
      if (id) {
        this.vehiculoId = parseInt(id, 10);
      }
    });
  }

  onSave() {
    if (this.fuelForm.invalid) return;
    this.saving = true;

    const { tipo, cantidad, unidad, monto } = this.fuelForm.value;

    this.fuelService.createFuel(this.vehiculoId, tipo, cantidad, unidad, monto).subscribe({
      next: () => {
        this.saving = false;
        alert('Registro guardado.');
        this.router.navigate(['/fuel', this.vehiculoId]);
      },
      error: (err) => {
        this.saving = false;
        console.error('Error al guardar:', err);
        alert('No se pudo guardar el registro.');
      }
    });
  }
}
