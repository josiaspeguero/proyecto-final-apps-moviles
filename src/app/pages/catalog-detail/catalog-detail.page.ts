import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSpinner, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { CatalogService, CatalogDetail } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-catalog-detail',
  templateUrl: './catalog-detail.page.html',
  styleUrls: ['./catalog-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSpinner, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, CommonModule, FormsModule]
})
export class CatalogDetailPage implements OnInit {
  vehicle: CatalogDetail | null = null;
  loading = true;
  selectedSegment = 'info';

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadDetail(id);
      } else {
        this.loading = false;
      }
    });
  }

  loadDetail(id: number | string) {
    this.loading = true;
    this.catalogService.getCatalogDetail(id).subscribe({
      next: (data) => {
        this.vehicle = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching catalog detail', err);
        this.loading = false;
      }
    });
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }
}
