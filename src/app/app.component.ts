import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { KnowledgeBaseComponent } from './components/knowledge-base/knowledge-base.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    FeaturesComponent,
    KnowledgeBaseComponent,
    PricingComponent,
    FooterComponent
  ],
  styles: [`
    :host {
      display: block;
    }
  `],
  template: `
    <app-hero></app-hero>
    <app-features></app-features>
    <app-knowledge-base></app-knowledge-base>
    <app-pricing></app-pricing>
    <app-footer></app-footer>
  `
})
export class AppComponent {}
