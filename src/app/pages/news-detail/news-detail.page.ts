import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class NewsDetailPage implements OnInit {
  newsItem: any = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadDetail(parseInt(idParam, 10));
    }
  }

  loadDetail(id: number) {
    this.loading = true;
    this.newsService.getNewsDetail(id).subscribe({
      next: (res) => {
        this.loading = false;
        this.newsItem = res.data || res;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar detalle noticia', err);
      }
    });
  }
}
