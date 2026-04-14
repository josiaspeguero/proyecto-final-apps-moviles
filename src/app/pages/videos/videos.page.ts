import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSpinner, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonRippleEffect, IonIcon, IonButton } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { VideosService, Video } from 'src/app/services/videos.service';
import { addIcons } from 'ionicons';
import { play, refresh } from 'ionicons/icons';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSpinner, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonRippleEffect, IonIcon, IonButton, CommonModule, FormsModule, RouterModule]
})
export class VideosPage implements OnInit {
  videos: Video[] = [];
  loading = true;
  error: string | null = null;

  constructor(private videosService: VideosService) {
    addIcons({ play, refresh });
  }

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    this.loading = true;
    this.error = null;
    this.videosService.getVideos().subscribe({
      next: (data) => {
        this.videos = data;
        this.loading = false;
        this.error = null;
      },
      error: (err) => {
        console.error('Error fetching videos', err);
        this.loading = false;
        
        if (err.status === 401) {
          this.error = 'No autorizado. Por favor inicia sesión nuevamente.';
        } else if (err.status === 403) {
          this.error = 'No tienes permiso para ver los videos.';
        } else if (err.status === 0) {
          this.error = 'Error de conexión. Verifica tu conexión a internet.';
        } else {
          this.error = err.error?.message || 'Error al cargar los videos. Intenta de nuevo.';
        }
      }
    });
  }
}
