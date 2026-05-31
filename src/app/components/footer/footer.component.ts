import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  styles: [`
    footer {
      background: linear-gradient(135deg, #1a1d3a 0%, #2a2e4d 50%, #3a4060 100%);
      border-top: 4px solid #e9b44c;
      padding: 3rem 1.5rem;
    }
    .footer-inner { max-width: 72rem; margin: 0 auto; }
    .footer-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    @media (min-width: 768px) {
      .footer-grid { grid-template-columns: 2fr 1fr 1fr; }
    }
    .footer-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .footer-brand svg { width: 2rem; height: 2rem; color: #e9b44c; }
    .footer-brand span { font-size: 1.25rem; font-weight: 700; color: #ffffff; }
    .footer-tagline {
      color: rgba(255,255,255,0.8);
      font-size: 0.875rem;
      line-height: 1.75;
      margin-bottom: 1rem;
    }
    .footer-quote {
      font-size: 0.75rem;
      color: #e9b44c;
      font-style: italic;
      font-weight: 600;
    }
    .footer-col h4 {
      font-weight: 600;
      margin-bottom: 1rem;
      color: #ffffff;
      font-size: 1rem;
    }
    .footer-links { list-style: none; padding: 0; margin: 0; }
    .footer-links li {
      font-size: 0.875rem;
      color: rgba(255,255,255,0.7);
      margin-bottom: 0.5rem;
      cursor: pointer;
      transition: color 0.15s ease;
    }
    .footer-links li:hover { color: #e9b44c; }
    .contact-list { list-style: none; padding: 0; margin: 0; }
    .contact-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: rgba(255,255,255,0.7);
      margin-bottom: 0.75rem;
    }
    .contact-list svg { width: 1rem; height: 1rem; color: #e9b44c; flex-shrink: 0; margin-top: 0.125rem; }
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.2);
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      font-size: 0.875rem;
      color: rgba(255,255,255,0.7);
    }
    @media (min-width: 768px) {
      .footer-bottom { flex-direction: row; }
    }
    .footer-powered { font-size: 0.75rem; }
  `],
  template: `
    <footer>
      <div class="footer-inner">
        <div class="footer-grid">
          <!-- Brand -->
          <div>
            <div class="footer-brand">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
                <path d="M12 5v14"/>
              </svg>
              <span>El Cerebro Jurídico</span>
            </div>
            <p class="footer-tagline">
              Plataforma de Inteligencia Artificial especializada en Derecho Policivo Colombiano.
              Desarrollada con tecnología RAG y supervisión experta del Dr. Arango.
            </p>
            <p class="footer-quote">
              "¡Válgame el desquiciamiento!" - Enfoque crítico del Modelo Categorial
            </p>
          </div>

          <!-- Resources -->
          <div class="footer-col">
            <h4>Recursos</h4>
            <ul class="footer-links">
              <li>Documentación</li>
              <li>Base de Conocimiento</li>
              <li>Términos de Servicio</li>
              <li>Política de Privacidad</li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="footer-col">
            <h4>Contacto</h4>
            <ul class="contact-list">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span>contacto&#64;cerebrojuridico.com</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+57 300 123 4567</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2026 El Cerebro Jurídico. Todos los derechos reservados.</p>
          <p class="footer-powered">Powered by RAG Technology • WhatsApp Business API • Wompi &amp; MercadoPago</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
