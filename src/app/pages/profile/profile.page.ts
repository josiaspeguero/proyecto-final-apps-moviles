import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  profile: any = null;
  loading: boolean = false;
  
  passActual: string = '';
  passNueva: string = '';
  changingPass: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    addIcons({ logOutOutline });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.authService.getProfile().subscribe({
      next: (res) => {
        // Asumiendo que la data viene en 'res' o 'res.data'
        this.profile = res.data || res;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar perfil:', err);
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.authService.uploadProfilePhoto(file).subscribe({
        next: (res) => {
          alert('Foto de perfil actualizada correctamente.');
          this.loadProfile(); // Recargamos para ver la nueva foto
        },
        error: (err) => {
          console.error('Error al subir foto:', err);
          alert('Falló la subida de imagen.');
        }
      });
    }
  }

  onChangePassword() {
    if (!this.passActual || !this.passNueva) return;
    this.changingPass = true;

    this.authService.changePassword(this.passActual, this.passNueva).subscribe({
      next: () => {
        this.changingPass = false;
        alert('Contraseña actualizada con éxito.');
        this.passActual = '';
        this.passNueva = '';
      },
      error: (err) => {
        this.changingPass = false;
        console.error('Error al cambiar contraseña:', err);
        alert('Hubo un error al cambiar la clave. Comprueba tu clave actual.');
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
