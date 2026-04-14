import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from '../../services/auth.service';
import { addIcons } from 'ionicons';
import { logOutOutline, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class WelcomePage implements OnInit {
  matricula: string | null = '';

  constructor(private authService: AuthService) {
    addIcons({ logOutOutline, personCircleOutline });
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'matricula' });
    this.matricula = value;
  }

  logout() {
    this.authService.logout();
  }
}
