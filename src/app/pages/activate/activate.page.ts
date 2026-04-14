import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ActivatePage {
  contrasena: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  async onActivate() {
    if (!this.contrasena) return;
    this.loading = true;

    // Recuperamos el token temporal que se guardó en el Register
    const { value: tempToken } = await Preferences.get({ key: 'tempToken' });

    if (!tempToken) {
      alert('Error: No se encontró un token válido. Regístrate de nuevo.');
      this.router.navigate(['/register']);
      this.loading = false;
      return;
    }

    this.authService.activate(tempToken, this.contrasena).subscribe({
      next: async () => {
        this.loading = false;
        // Limpiamos el token temporal una vez usado exitosamente
        await Preferences.remove({ key: 'tempToken' });
        
        // Navegación obligatoria → Login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error:', err);
        alert('Error al activar la cuenta.');
      }
    });
  }
}
