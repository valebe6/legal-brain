import { Component, inject } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { KnowledgeBaseComponent } from './components/knowledge-base/knowledge-base.component';
import { ChatSimulatorComponent } from './components/chat-simulator/chat-simulator.component';
import { DocumentManagerComponent } from './components/document-manager/document-manager.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    FeaturesComponent,
    KnowledgeBaseComponent,
    ChatSimulatorComponent,
    DocumentManagerComponent,
    PricingComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public readonly authService = inject(AuthService);
}
