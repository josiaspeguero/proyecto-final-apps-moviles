import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenancesService } from '../../services/maintenances.service';

@Component({
  selector: 'app-maintenance-create',
  templateUrl: './maintenance-create.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class MaintenanceCreatePage implements OnInit {
  vehiculoId!: number;
  maintenanceForm: FormGroup;
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private maintService: MaintenancesService
  ) {
    this.maintenanceForm = this.fb.group({
      tipo: ['', Validators.required],
      costo: ['', [Validators.required, Validators.min(0)]]
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
    if (this.maintenanceForm.invalid) return;
    this.saving = true;

    const { tipo, costo } = this.maintenanceForm.value;

    this.maintService.createMaintenance(this.vehiculoId, tipo, costo).subscribe({
      next: () => {
        this.saving = false;
        alert('Mantenimiento registrado.');
        this.router.navigate(['/maintenances', this.vehiculoId]);
      },
      error: (err) => {
        this.saving = false;
        console.error('Error al guardar:', err);
        alert('No se pudo guardar el mantenimiento.');
      }
    });
  }
}
