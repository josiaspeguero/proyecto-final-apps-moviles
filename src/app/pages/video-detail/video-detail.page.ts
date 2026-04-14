import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSpinner, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideosService, Video } from 'src/app/services/videos.service';
import { addIcons } from 'ionicons';
import { openOutline, refresh } from 'ionicons/icons';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.page.html',
  styleUrls: ['./video-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSpinner, IonButton, IonIcon, CommonModule, FormsModule]
})
export class VideoDetailPage implements OnInit {
  video: Video | null = null;
  loading = true;
  error: string | null = null;
  youtubeEmbedUrl: SafeResourceUrl | null = null;
  private videoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private videosService: VideosService,
    private sanitizer: DomSanitizer
  ) {
    addIcons({ openOutline, refresh });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.videoId = id;
        this.loadVideoDetail(id);
      } else {
        this.loading = false;
        this.error = 'No se especificó un video para mostrar.';
      }
    });
  }

  loadVideoDetail(id: number | string) {
    this.loading = true;
    this.error = null;
    this.videosService.getVideos().subscribe({
      next: (videos) => {
        const foundVideo = videos.find(v => v.id === id || v.id === parseInt(id as string));
        if (foundVideo) {
          this.video = foundVideo;
          if (this.video.youtubeId) {
            this.youtubeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://www.youtube.com/embed/${this.video.youtubeId}?rel=0&modestbranding=1`
            );
          }
          this.loading = false;
          this.error = null;
        } else {
          this.loading = false;
          this.error = 'No se encontró el video solicitado.';
        }
      },
      error: (err) => {
        console.error('Error fetching video detail:', err);
        this.loading = false;
        
        if (err.status === 401) {
          this.error = 'No autorizado. Por favor inicia sesión nuevamente.';
        } else if (err.status === 403) {
          this.error = 'No tienes permiso para ver este video.';
        } else if (err.status === 0) {
          this.error = 'Error de conexión. Verifica tu conexión a internet.';
        } else {
          this.error = err.error?.message || 'Error al cargar el video. Intenta de nuevo.';
        }
      }
    });
  }

  openExternalVideo() {
    if (this.video?.url) {
      window.open(this.video.url, '_blank');
    }
  }

  retry() {
    if (this.videoId) {
      this.loadVideoDetail(this.videoId);
    }
  }
}
