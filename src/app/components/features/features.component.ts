import { Component, signal } from '@angular/core';

interface Feature {
  title: string;
  description: string;
  iconColor: string;
  iconName: 'zap' | 'database' | 'lock' | 'users' | 'bot' | 'shield';
}

@Component({
  selector: 'app-features',
  standalone: true,
  styles: [`
    .features-section {
      padding: 6rem 1.5rem;
      background-color: #e8eaf0;
    }
    .features-inner {
      max-width: 72rem;
      margin: 0 auto;
    }
    h2 {
      font-size: 2.25rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 1rem;
      color: #0f1419;
    }
    .section-subtitle {
      color: #4a5064;
      text-align: center;
      margin-bottom: 4rem;
      max-width: 42rem;
      margin-left: auto;
      margin-right: auto;
    }
    .features-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    @media (min-width: 768px) {
      .features-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .features-grid { grid-template-columns: repeat(3, 1fr); }
    }
    .feature-card {
      background: #ffffff;
      border: 2px solid #c0c4d0;
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.2s ease;
    }
    .feature-card:hover {
      border-color: #1a1d3a;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.12);
    }
    .feature-icon {
      width: 2.5rem;
      height: 2.5rem;
      margin-bottom: 1rem;
    }
    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #0f1419;
      margin-bottom: 0.5rem;
    }
    .feature-card p {
      color: #4a5064;
      line-height: 1.75;
      font-size: 0.95rem;
    }
  `],
  template: `
    <div class="features-section">
      <div class="features-inner">
        <h2>Arquitectura Tecnológica</h2>
        <p class="section-subtitle">
          Cumplimiento técnico y jurídico garantizado para las exigencias del Estado
        </p>

        <div class="features-grid">
          @for (feature of features(); track feature.title) {
            <div class="feature-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="feature-icon" [style.color]="feature.iconColor">
                @switch (feature.iconName) {
                  @case ('zap') {
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  }
                  @case ('database') {
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
                    <path d="M3 12A9 3 0 0 0 21 12"/>
                  }
                  @case ('lock') {
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  }
                  @case ('users') {
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  }
                  @case ('bot') {
                    <path d="M12 8V4H8"/>
                    <rect width="16" height="12" x="4" y="8" rx="2"/>
                    <path d="M2 14h2"/>
                    <path d="M20 14h2"/>
                    <path d="M15 13v2"/>
                    <path d="M9 13v2"/>
                  }
                  @case ('shield') {
                    <path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z"/>
                  }
                }
              </svg>
              <h3>{{feature.title}}</h3>
              <p>{{feature.description}}</p>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class FeaturesComponent {
  readonly features = signal<Feature[]>([
    { iconName: 'zap', title: 'API WhatsApp Business', iconColor: '#4a5fd8',
      description: 'Acceso directo desde el bolsillo del funcionario. Canal exclusivo sin interfaces web complejas.' },
    { iconName: 'database', title: 'Cero Alucinaciones (RAG)', iconColor: '#2a9d8f',
      description: 'Si la respuesta no está en el acervo documental, la IA declara expresamente que no tiene la información.' },
    { iconName: 'lock', title: 'Aislamiento de Sesiones', iconColor: '#e9b44c',
      description: 'Por mandato de Hábeas Data y debido proceso, cada chat es independiente. Memoria cero entre usuarios.' },
    { iconName: 'users', title: 'Human-in-the-Loop', iconColor: '#9b59b6',
      description: 'Cuando el sistema no sabe, escala al Dr. Arango. Respuesta en 24h y auto-entrenamiento continuo.' },
    { iconName: 'bot', title: 'Personalidad del Autor', iconColor: '#e74c3c',
      description: 'Estilo académico y crítico con el Modelo Categorial, trialismo jurídico y expresiones doctrinales únicas.' },
    { iconName: 'shield', title: 'Seguridad y Paywall', iconColor: '#4a5fd8',
      description: 'Pasarela de pago recurrente y validación por Device ID para evitar piratería de cuentas.' }
  ]);
}
