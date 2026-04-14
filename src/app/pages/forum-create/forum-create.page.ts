import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-forum-create',
  templateUrl: './forum-create.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class ForumCreatePage implements OnInit {
  forumForm: FormGroup;
  saving = false;
  vehicles: any[] = [];
  loadingVehicles = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private forumService: ForumService,
    private vehicleService: VehiclesService
  ) {
    this.forumForm = this.fb.group({
      vehiculo_id: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.loadingVehicles = true;
    this.vehicleService.getVehicles().subscribe({
      next: (res) => {
        this.loadingVehicles = false;
        let data = res.data || res;
        this.vehicles = Array.isArray(data) ? data : (data.vehiculos || []);
      },
      error: (err) => {
        this.loadingVehicles = false;
        console.error('Error al cargar vehículos', err);
      }
    });
  }

  onSave() {
    if (this.forumForm.invalid) return;
    this.saving = true;

    const { vehiculo_id, titulo, descripcion } = this.forumForm.value;

    this.forumService.createTopic(parseInt(vehiculo_id, 10), titulo, descripcion).subscribe({
      next: () => {
        this.saving = false;
        alert('Tema creado con éxito.');
        this.router.navigate(['/forum']);
      },
      error: (err) => {
        this.saving = false;
        console.error('Error al crear tema:', err);
        alert('No se pudo crear el tema.');
      }
    });
  }
}
