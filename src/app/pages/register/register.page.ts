import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class RegisterPage {
  matricula: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (!this.matricula) return;
    this.loading = true;
    
    this.authService.register(this.matricula).subscribe({
      next: async (res) => {
        this.loading = false;
        // Guardamos el token temporal que retorna el registro para enviarlo al activar
        if(res && res.data){
           // Si viene según la API o asumiendo que lo extraemos de res
           await Preferences.set({ key: 'tempToken', value: res.token || res.data?.token });
        } else if (res && res.token) {
           await Preferences.set({ key: 'tempToken', value: res.token });
        }
        // Navegación obligatoria → Activar
        this.router.navigate(['/activate']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error:', err);
        alert('Error en registro: Verifica tu conexión o intenta nuevamente.');
      }
    });
  }
}
