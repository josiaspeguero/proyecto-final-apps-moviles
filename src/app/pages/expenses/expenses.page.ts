import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class ExpensesPage implements OnInit {
  vehiculoId!: number;
  expenses: any[] = [];
  loading = false;
  rawRes: any = null; // para depuracion en caso raro

  constructor(
    private route: ActivatedRoute,
    private expensesService: ExpensesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('vehiculo_id');
      if (id) {
        this.vehiculoId = parseInt(id, 10);
        this.loadExpenses();
      }
    });
  }

  ionViewWillEnter() {
    if (this.vehiculoId) {
      this.loadExpenses();
    }
  }

  loadExpenses() {
    this.loading = true;
    this.expensesService.getExpenses(this.vehiculoId).subscribe({
      next: (res) => {
        this.loading = false;
        this.rawRes = res;
        
        // Manejo flexible de respuesta
        let data = res.data || res;
        if (!Array.isArray(data)) {
           data = data.gastos || data.lista || Object.values(data).find(Array.isArray) || [];
        }
        this.expenses = data;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar gastos:', err);
      }
    });
  }
}
