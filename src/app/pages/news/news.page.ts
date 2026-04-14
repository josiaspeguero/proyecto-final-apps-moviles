import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class NewsPage implements OnInit {
  news: any[] = [];
  loading = false;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.loading = true;
    this.newsService.getNews().subscribe({
      next: (res) => {
        this.loading = false;
        let data = res.data || res;
        this.news = Array.isArray(data) ? data : (data.noticias || data.lista || []);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar noticias', err);
      }
    });
  }
}
