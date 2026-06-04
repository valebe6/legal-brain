import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { HeaderComponent } from '../shared/header/header.component';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FormsModule, HeaderComponent, ModalComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  public readonly authService = inject(AuthService);

  readonly showLoginModal = signal<boolean>(false);
  loginUsername = '';
  loginPassword = '';
  readonly loginError = signal<string>('');

  openLoginModal(): void {
    this.loginUsername = '';
    this.loginPassword = '';
    this.loginError.set('');
    this.showLoginModal.set(true);
  }

  closeLoginModal(): void {
    this.showLoginModal.set(false);
  }

  submitLogin(event: Event): void {
    event.preventDefault();
    this.loginError.set('');

    const success = this.authService.login(this.loginUsername, this.loginPassword);
    if (success) {
      this.closeLoginModal();
    } else {
      this.loginError.set('Usuario o contraseña incorrectos.');
    }
  }

  logout(): void {
    this.authService.logout();
  }

  scrollToAdmin(): void {
    setTimeout(() => {
      document.getElementById('document-manager')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  scrollToDocs(): void {
    document.getElementById('knowledge-base')?.scrollIntoView({ behavior: 'smooth' });
  }

  triggerWhatsApp(): void {
    // For now, no action as per requirements or default behavior
    alert('Simulando redirección a WhatsApp Business del Cerebro Jurídico...');
  }
}
