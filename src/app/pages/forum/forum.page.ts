import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule]
})
export class ForumPage implements OnInit {
  topics: any[] = [];
  loading = false;
  viewState: 'all' | 'my' = 'all';

  constructor(private forumService: ForumService) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.segmentChanged();
  }

  segmentChanged() {
    this.loading = true;
    this.topics = [];
    const request = this.viewState === 'all' ? this.forumService.getTopics() : this.forumService.getMyTopics();
    
    request.subscribe({
      next: (res) => {
        this.loading = false;
        let data = res.data || res;
        this.topics = Array.isArray(data) ? data : (data.temas || data.lista || []);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error cargando foro', err);
      }
    });
  }
}
