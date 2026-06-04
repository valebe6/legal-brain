import { Component, signal } from '@angular/core';

interface Feature {
  title: string;
  description: string;
  iconColor: string;
  iconName: 'zap' | 'database' | 'lock' | 'users' | 'bot' | 'shield';
}

import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
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
