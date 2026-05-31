import { Component, signal } from '@angular/core';

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  styles: [`
    .pricing-section {
      padding: 6rem 1.5rem;
      background-color: #e8eaf0;
    }
    .pricing-inner { max-width: 72rem; margin: 0 auto; }
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
      margin-bottom: 1rem;
      max-width: 42rem;
      margin-left: auto;
      margin-right: auto;
    }
    .payment-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 4rem;
    }
    .payment-badge svg { width: 1.25rem; height: 1.25rem; color: #4a5fd8; }
    .payment-badge span { font-size: 0.875rem; color: #4a5064; }
    .pricing-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    @media (min-width: 768px) {
      .pricing-grid { grid-template-columns: repeat(3, 1fr); }
    }
    .plan-card {
      border-radius: 0.75rem;
      padding: 2rem;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      transition: all 0.2s ease;
    }
    .plan-card.normal {
      background: #ffffff;
      border: 2px solid #c0c4d0;
    }
    .plan-card.highlighted {
      background: linear-gradient(135deg, #1a1d3a, #2a2e4d);
      border: 2px solid #e9b44c;
    }
    .recommended-badge {
      display: inline-block;
      background-color: #e9b44c;
      color: #0f1419;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      margin-bottom: 1rem;
    }
    .plan-name {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .plan-name.dark { color: #ffffff; }
    .plan-name.light { color: #0f1419; }
    .plan-desc {
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }
    .plan-desc.dark { color: rgba(255,255,255,0.75); }
    .plan-desc.light { color: #4a5064; }
    .plan-price-row { margin-bottom: 2rem; }
    .plan-price {
      font-size: 2.25rem;
      font-weight: 700;
    }
    .plan-price.dark { color: #ffffff; }
    .plan-price.light { color: #0f1419; }
    .plan-period {
      font-size: 0.95rem;
    }
    .plan-period.dark { color: rgba(255,255,255,0.65); }
    .plan-period.light { color: #4a5064; }
    .features-list {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem 0;
    }
    .features-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .features-list svg { width: 1.25rem; height: 1.25rem; margin-top: 0.125rem; flex-shrink: 0; }
    .feature-text {
      font-size: 0.875rem;
    }
    .feature-text.dark { color: #ffffff; }
    .feature-text.light { color: #0f1419; }
    .plan-btn {
      width: 100%;
      padding: 0.75rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      transition: all 0.2s ease;
    }
    .plan-btn svg { width: 1rem; height: 1rem; }
    .plan-btn.highlighted-btn {
      background-color: #e9b44c;
      color: #0f1419;
    }
    .plan-btn.highlighted-btn:hover {
      background-color: rgba(233,180,76,0.88);
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15);
    }
    .plan-btn.normal-btn {
      background-color: #2a2e4d;
      color: #ffffff;
    }
    .plan-btn.normal-btn:hover {
      background-color: #1a1d3a;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15);
    }
  `],
  template: `
    <div class="pricing-section">
      <div class="pricing-inner">
        <h2>Planes de Suscripción</h2>
        <p class="section-subtitle">Acceso seguro validado por número celular</p>
        <div class="payment-badge">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
          </svg>
          <span>Pagos con Wompi y MercadoPago</span>
        </div>

        <div class="pricing-grid">
          @for (plan of plans(); track plan.name) {
            <div class="plan-card" [class.highlighted]="plan.highlighted" [class.normal]="!plan.highlighted">
              @if (plan.highlighted) {
                <div class="recommended-badge">Recomendado</div>
              }

              <div class="plan-name" [class.dark]="plan.highlighted" [class.light]="!plan.highlighted">{{plan.name}}</div>
              <div class="plan-desc" [class.dark]="plan.highlighted" [class.light]="!plan.highlighted">{{plan.description}}</div>

              <div class="plan-price-row">
                <span class="plan-price" [class.dark]="plan.highlighted" [class.light]="!plan.highlighted">{{plan.price}}</span>
                <span class="plan-period" [class.dark]="plan.highlighted" [class.light]="!plan.highlighted">{{plan.period}}</span>
              </div>

              <ul class="features-list">
                @for (feature of plan.features; track feature) {
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      [style.color]="plan.highlighted ? '#e9b44c' : '#2a9d8f'">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                    <span class="feature-text" [class.dark]="plan.highlighted" [class.light]="!plan.highlighted">{{feature}}</span>
                  </li>
                }
              </ul>

              <button class="plan-btn" [class.highlighted-btn]="plan.highlighted" [class.normal-btn]="!plan.highlighted">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                  <line x1="12" x2="12.01" y1="18" y2="18"/>
                </svg>
                {{plan.price === 'Contactar' ? 'Contactar Ventas' : 'Suscribirse'}}
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class PricingComponent {
  readonly plans = signal<Plan[]>([
    {
      name: 'Básico', price: '$49.000', period: '/mes',
      description: 'Para funcionarios individuales',
      features: ['Acceso ilimitado por WhatsApp','Base completa de 29 documentos','Respuestas instantáneas 24/7','Soporte HITL en 24h','Validación por Device ID']
    },
    {
      name: 'Institucional', price: '$299.000', period: '/mes',
      description: 'Para entidades y dependencias',
      features: ['Todo lo del plan Básico','Hasta 20 usuarios simultáneos','Prioridad en soporte HITL','Reportes de uso mensuales','Soporte técnico dedicado','Integración con sistemas propios'],
      highlighted: true
    },
    {
      name: 'Empresarial', price: 'Contactar', period: '',
      description: 'Para grandes organizaciones',
      features: ['Todo lo del plan Institucional','Usuarios ilimitados','SLA garantizado','Capacitación personalizada','API privada dedicada','Documentos personalizados']
    }
  ]);
}
