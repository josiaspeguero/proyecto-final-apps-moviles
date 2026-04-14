import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ForgotPasswordPage {
  matricula: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onForgot() {
    if (!this.matricula) return;
    this.loading = true;

    this.authService.forgotPassword(this.matricula).subscribe({
      next: (res) => {
        this.loading = false;
        alert('Se ha generado una contraseña temporal exitosamente. (Revisa la respuesta del API)');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error:', err);
        alert('Error al recuperar contraseña. Por favor intenta nuevamente.');
      }
    });
  }
}
