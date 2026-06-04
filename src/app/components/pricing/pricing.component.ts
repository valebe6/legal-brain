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
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
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
