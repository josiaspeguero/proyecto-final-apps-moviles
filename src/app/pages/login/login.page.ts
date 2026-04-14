import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class LoginPage implements OnInit {
  matricula: string = '';
  contrasena: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private ngZone: NgZone
  ) {}

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'token' });
    if (value) {
      this.router.navigate(['/welcome']);
    }
  }

  onLogin() {
    if (!this.matricula || !this.contrasena) return;
    this.loading = true;

    this.authService.login(this.matricula, this.contrasena).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          this.loading = false;
          // Validar si realmente hay datos
          if (res && res.exito === false) {
             alert('Error: ' + (res.mensaje || 'Credenciales incorrectas'));
             return;
          }
          // Navegación a bienvenida tal como se solicitó originalmente
          this.router.navigate(['/welcome']);
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.loading = false;
          console.error('Error:', err);
          alert('Credenciales incorrectas o error de conexión.');
        });
      }
    });
  }
}
