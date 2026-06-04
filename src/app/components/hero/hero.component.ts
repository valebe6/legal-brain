import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FormsModule],
  styles: [`
    .hero {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #1a1d3a 0%, #2a2e4d 50%, #3a4060 100%);
      padding: 7rem 1.5rem 6rem;
    }
    .hero-inner {
      max-width: 72rem;
      margin: 0 auto;
    }
    
    /* Top Header Bar inside Hero */
    .hero-header {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      left: 1.5rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
      z-index: 40;
    }
    
    .admin-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .admin-badge {
      background-color: #e9b44c;
      color: #1a1d3a;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .btn-admin-nav {
      background-color: #2a9d8f;
      color: #ffffff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .btn-admin-nav:hover {
      background-color: rgba(42, 157, 143, 0.85);
      transform: translateY(-1px);
    }
    
    .btn-login-trigger {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: #ffffff;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-login-trigger:hover {
      background: rgba(255,255,255,0.2);
      border-color: rgba(255,255,255,0.4);
      transform: scale(1.05);
    }
    
    .btn-logout {
      background: rgba(196,30,58,0.15);
      border: 1px solid rgba(196,30,58,0.3);
      color: #ffffff;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-logout:hover {
      background: rgba(196,30,58,0.3);
    }
    
    /* Login Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 20, 25, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      animation: fadeIn 0.2s ease-out;
    }
    
    .login-modal {
      background: #ffffff;
      border: 1.5px solid #2a9d8f;
      border-radius: 0.75rem;
      width: 100%;
      max-width: 320px;
      padding: 2.5rem 1.75rem 1.75rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      position: relative;
      animation: scaleIn 0.2s ease-out;
    }
    
    .modal-avatar-wrapper {
      position: absolute;
      top: -24px;
      left: 50%;
      transform: translateX(-50%);
      background: #2a9d8f;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      border: 3px solid #ffffff;
    }
    .modal-avatar-wrapper svg {
      width: 24px;
      height: 24px;
    }
    
    .modal-close-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: none;
      border: none;
      color: #4a5064;
      cursor: pointer;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      transition: background-color 0.15s ease;
    }
    .modal-close-btn:hover {
      color: #1a1d3a;
      background-color: #f5f6fa;
    }
    
    .login-error {
      background: rgba(196,30,58,0.1);
      border-left: 3px solid #c41e3a;
      color: #c41e3a;
      padding: 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.8rem;
      margin-bottom: 1rem;
      font-weight: 500;
    }
    
    .form-group-modal {
      margin-bottom: 1rem;
    }
    .form-group-modal label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: #0f1419;
      margin-bottom: 0.35rem;
    }
    .form-control-modal {
      width: 100%;
      padding: 0.625rem 0.875rem;
      border: 1.5px solid #c0c4d0;
      border-radius: 0.5rem;
      font-size: 0.95rem;
      background-color: #f5f6fa;
      color: #0f1419;
      transition: all 0.15s ease;
    }
    .form-control-modal:focus {
      outline: none;
      border-color: #2a9d8f;
      background-color: #ffffff;
      box-shadow: 0 0 0 3px rgba(42, 157, 143, 0.1);
    }
    
    .btn-login-submit {
      background-color: #2a9d8f;
      color: #ffffff;
      width: 100%;
      padding: 0.75rem;
      border-radius: 0.5rem;
      border: none;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background-color 0.15s ease, transform 0.1s ease;
      margin-top: 0.5rem;
      box-shadow: 0 4px 6px rgba(42, 157, 143, 0.2);
    }
    .btn-login-submit:hover {
      background-color: #238275;
    }
    .btn-login-submit:active {
      transform: scale(0.98);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .hero-title-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    .hero-icon { color: #e9b44c; width: 3rem; height: 3rem; }
    h1 {
      font-size: 3rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.1;
    }
    .hero-subtitle {
      font-size: 1.25rem;
      color: rgba(255,255,255,0.9);
      text-align: center;
      max-width: 48rem;
      margin: 0 auto 2rem;
    }
    .hero-desc {
      font-size: 1.125rem;
      color: rgba(255,255,255,0.8);
      text-align: center;
      max-width: 56rem;
      margin: 0 auto 3rem;
      line-height: 1.75;
    }
    .highlight { color: #e9b44c; font-weight: 600; }
    .hero-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .btn-whatsapp {
      background-color: #2a9d8f;
      color: #ffffff;
      padding: 0.75rem 2rem;
      border-radius: 0.5rem;
      border: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.15s ease;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    }
    .btn-whatsapp:hover { background-color: rgba(42,157,143,0.85); }
    .btn-docs {
      background-color: #ffffff;
      color: #1a1d3a;
      padding: 0.75rem 2rem;
      border-radius: 0.5rem;
      border: none;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.15s ease;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    }
    .btn-docs:hover { background-color: rgba(255,255,255,0.9); }
    
    .hero-stats {
      margin-top: 4rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 48rem;
      margin-left: auto;
      margin-right: auto;
    }
    .stat-card {
      text-align: center;
      background-color: rgba(255,255,255,0.1);
      backdrop-filter: blur(4px);
      border-radius: 0.5rem;
      padding: 1rem;
    }
    .stat-number {
      font-size: 1.875rem;
      font-weight: 700;
      color: #e9b44c;
    }
    .stat-label {
      font-size: 0.875rem;
      color: rgba(255,255,255,0.8);
      margin-top: 0.25rem;
    }
  `],
  template: `
    <div class="hero">
      <!-- Header bar at the top of the hero section -->
      <div class="hero-header">
        @if (authService.isAdmin()) {
          <div class="admin-controls">
            <span class="admin-badge">Admin</span>
            <button class="btn-admin-nav" (click)="scrollToAdmin()">Administrar documentos</button>
            <button class="btn-logout" (click)="logout()">Cerrar Sesión</button>
          </div>
        } @else {
          <button class="btn-login-trigger" (click)="openLoginModal()" title="Login Administrador">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 1.25rem; height: 1.25rem;">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        }
      </div>

      <div class="hero-inner">
        <div class="hero-title-row">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hero-icon">
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
            <path d="M12 5v14"/>
          </svg>
          <h1>El Cerebro Jurídico</h1>
        </div>

        <p class="hero-subtitle">
          Asistente de Inteligencia Artificial especializado en Derecho Policivo Colombiano
        </p>

        <p class="hero-desc">
          Base de conocimiento con <span class="highlight">29 documentos especializados</span> (~1,800 páginas)
          incluyendo doctrina propia, leyes clave, decretos y jurisprudencia fundacional
        </p>

        <div class="hero-buttons">
          <button class="btn-docs" (click)="scrollToDocs()">Ver Documentación</button>
        </div>

        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-number">29</div>
            <div class="stat-label">Documentos</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">~1,800</div>
            <div class="stat-label">Páginas</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">24h</div>
            <div class="stat-label">Respuesta Humana</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Modal (Overlay) -->
    @if (showLoginModal()) {
      <div class="modal-overlay" (click)="closeLoginModal()">
        <div class="login-modal" (click)="$event.stopPropagation()">
          <button class="modal-close-btn" (click)="closeLoginModal()" title="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 1rem; height: 1rem;">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          
          <div class="modal-avatar-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>

          <form (submit)="submitLogin($event)" style="margin-top: 0.75rem;">
            @if (loginError()) {
              <div class="login-error">
                {{ loginError() }}
              </div>
            }

            <div class="form-group-modal">
              <label for="username">Usuario</label>
              <input
                type="text"
                id="username"
                class="form-control-modal"
                name="username"
                [(ngModel)]="loginUsername"
                required
                autocomplete="username"
                placeholder="admin"
              />
            </div>

            <div class="form-group-modal">
              <label for="password">Contraseña</label>
              <input
                type="password"
                id="password"
                class="form-control-modal"
                name="password"
                [(ngModel)]="loginPassword"
                required
                autocomplete="current-password"
                placeholder="Contraseña"
              />
            </div>

            <button type="submit" class="btn-login-submit">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    }
  `
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
