import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ForumDetailPage implements OnInit {
  topicId!: number;
  topic: any = null;
  loading = false;
  
  newReply: string = '';
  replying = false;

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.topicId = parseInt(idParam, 10);
      this.loadTopic();
    }
  }

  loadTopic() {
    this.loading = true;
    this.forumService.getTopicDetail(this.topicId).subscribe({
      next: (res) => {
        this.loading = false;
        this.topic = res.data || res;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar tema', err);
      }
    });
  }

  onReply() {
    if (!this.newReply.trim()) return;
    this.replying = true;
    
    this.forumService.replyTopic(this.topicId, this.newReply).subscribe({
      next: () => {
        this.replying = false;
        this.newReply = ''; // clear input
        this.loadTopic(); // reload details to show new reply
      },
      error: (err) => {
        this.replying = false;
        console.error('Error al enviar respuesta', err);
        alert('No se pudo enviar la respuesta.');
      }
    });
  }
}
