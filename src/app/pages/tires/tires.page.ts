import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TiresService } from '../../services/tires.service';

@Component({
  selector: 'app-tires',
  templateUrl: './tires.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class TiresPage implements OnInit {
  vehiculoId!: number;
  tires: any[] = [];
  loading = false;
  
  // Variables for Puncture form simulation (Inline inside list)
  punctureForm: FormGroup;
  selectedTireId: number | null = null;
  savingStatus = false;
  savingPuncture = false;

  constructor(
    private route: ActivatedRoute,
    private tiresService: TiresService,
    private fb: FormBuilder
  ) {
    this.punctureForm = this.fb.group({
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('vehiculo_id');
      if (id) {
        this.vehiculoId = parseInt(id, 10);
        this.loadTires();
      }
    });
  }

  rawRes: any = null;

  loadTires() {
    this.loading = true;
    this.tiresService.getTires(this.vehiculoId).subscribe({
      next: (res) => {
        this.loading = false;
        this.rawRes = res; // para depuración en interfaz si hiciera falta
        
        let data = res.data || res;
        if (!Array.isArray(data)) {
           // Intenta buscar arreglos anidados si el backend estructuró distinto
           data = data.gomas || data.lista || Object.values(data).find(Array.isArray) || [];
        }
        this.tires = data;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar gomas:', err);
      }
    });
  }

  onUpdateStatus(gomaId: number, estado: string) {
    this.savingStatus = true;
    this.tiresService.updateTireStatus(gomaId, estado).subscribe({
      next: () => {
        this.savingStatus = false;
        alert('Estado actualizado.');
        this.loadTires();
      },
      error: (err) => {
        this.savingStatus = false;
        console.error('Error al actualizar estado:', err);
        alert('Error al actualizar el estado.');
      }
    });
  }

  toggleAddPuncture(gomaId: number) {
    if (this.selectedTireId === gomaId) {
      this.selectedTireId = null; // hide form
    } else {
      this.selectedTireId = gomaId;
      this.punctureForm.reset();
      // Set default date to today
      this.punctureForm.patchValue({
        fecha: new Date().toISOString().split('T')[0]
      });
    }
  }

  onSavePuncture() {
    if (this.punctureForm.invalid || !this.selectedTireId) return;
    this.savingPuncture = true;

    const { descripcion, fecha } = this.punctureForm.value;

    this.tiresService.registerPuncture(this.selectedTireId, descripcion, fecha).subscribe({
      next: () => {
        this.savingPuncture = false;
        alert('Pinchazo registrado.');
        this.selectedTireId = null; // hide form
        // Optional: you can reload tires if the puncture count/data is included in the list
        this.loadTires(); 
      },
      error: (err) => {
        this.savingPuncture = false;
        console.error('Error al registrar pinchazo:', err);
        alert('No se pudo guardar el pinchazo.');
      }
    });
  }
}
