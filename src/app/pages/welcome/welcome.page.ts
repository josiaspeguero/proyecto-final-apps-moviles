import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from '../../services/auth.service';
import { addIcons } from 'ionicons';
import { logOutOutline, personCircleOutline, car, chatbubbles, newspaper, playCircle, book } from 'ionicons/icons';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class WelcomePage implements OnInit {
  matricula: string | null = '';
  profile: any = null;

  constructor(private authService: AuthService) {
    addIcons({ logOutOutline, personCircleOutline, car, chatbubbles, newspaper, playCircle, book });
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'matricula' });
    this.matricula = value;
    this.loadProfile();
  }

  loadProfile() {
    this.authService.getProfile().subscribe({
      next: (res) => {
        this.profile = res.data || res;
      },
      error: (err) => {
        console.error('Error al cargar perfil:', err);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
