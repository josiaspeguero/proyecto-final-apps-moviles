import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IncomeService } from '../../services/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class IncomePage implements OnInit {
  vehiculoId!: number;
  incomes: any[] = [];
  loading = false;
  rawRes: any = null;

  constructor(
    private route: ActivatedRoute,
    private incomeService: IncomeService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('vehiculo_id');
      if (id) {
        this.vehiculoId = parseInt(id, 10);
        this.loadIncome();
      }
    });
  }

  ionViewWillEnter() {
    if (this.vehiculoId) {
      this.loadIncome();
    }
  }

  loadIncome() {
    this.loading = true;
    this.incomeService.getIncome(this.vehiculoId).subscribe({
      next: (res) => {
        this.loading = false;
        this.rawRes = res;
        
        let data = res.data || res;
        if (!Array.isArray(data)) {
           data = data.ingresos || data.lista || Object.values(data).find(Array.isArray) || [];
        }
        this.incomes = data;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar ingresos:', err);
      }
    });
  }
}
