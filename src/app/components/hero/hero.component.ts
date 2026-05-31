import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  styles: [`
    .hero {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #1a1d3a 0%, #2a2e4d 50%, #3a4060 100%);
      padding: 6rem 1.5rem;
    }
    .hero-inner {
      max-width: 72rem;
      margin: 0 auto;
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
          <button class="btn-whatsapp">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.25rem;height:1.25rem">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
            </svg>
            Iniciar Chat en WhatsApp
          </button>
          <button class="btn-docs">Ver Documentación</button>
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
  `
})
export class HeroComponent {}
