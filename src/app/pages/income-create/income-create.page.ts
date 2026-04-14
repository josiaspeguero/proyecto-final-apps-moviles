import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeService } from '../../services/income.service';

@Component({
  selector: 'app-income-create',
  templateUrl: './income-create.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class IncomeCreatePage implements OnInit {
  vehiculoId!: number;
  incomeForm: FormGroup;
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private incomeService: IncomeService
  ) {
    this.incomeForm = this.fb.group({
      monto: ['', [Validators.required, Validators.min(0.1)]],
      concepto: ['', Validators.required]
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
    if (this.incomeForm.invalid) return;
    this.saving = true;

    const { monto, concepto } = this.incomeForm.value;

    this.incomeService.createIncome(this.vehiculoId, parseFloat(monto), concepto).subscribe({
      next: () => {
        this.saving = false;
        alert('Ingreso guardado con éxito.');
        this.router.navigate(['/income', this.vehiculoId]);
      },
      error: (err) => {
        this.saving = false;
        console.error('Error al guardar ingreso:', err);
        alert('No se pudo guardar el ingreso.');
      }
    });
  }
}
