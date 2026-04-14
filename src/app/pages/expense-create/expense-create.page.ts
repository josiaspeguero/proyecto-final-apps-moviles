import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class ExpenseCreatePage implements OnInit {
  vehiculoId!: number;
  expenseForm: FormGroup;
  saving = false;
  categories: any[] = [];
  loadingCats = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private expService: ExpensesService
  ) {
    this.expenseForm = this.fb.group({
      categoriaId: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('vehiculo_id');
      if (id) {
        this.vehiculoId = parseInt(id, 10);
        this.loadCategories();
      }
    });
  }

  loadCategories() {
    this.loadingCats = true;
    this.expService.getCategories().subscribe({
      next: (res) => {
        this.loadingCats = false;
        let data = res.data || res;
        this.categories = Array.isArray(data) ? data : (data.categorias || Object.values(data).find(Array.isArray) || []);
      },
      error: (err) => {
        this.loadingCats = false;
        console.error('Error cargando categorias', err);
      }
    });
  }

  onSave() {
    if (this.expenseForm.invalid) return;
    this.saving = true;

    const { categoriaId, monto, descripcion } = this.expenseForm.value;

    this.expService.createExpense(this.vehiculoId, parseInt(categoriaId, 10), parseFloat(monto), descripcion).subscribe({
      next: () => {
        this.saving = false;
        alert('Gasto registrado con éxito.');
        this.router.navigate(['/expenses', this.vehiculoId]);
      },
      error: (err) => {
        this.saving = false;
        console.error('Error al guardar gasto:', err);
        alert('No se pudo guardar el gasto.');
      }
    });
  }
}
