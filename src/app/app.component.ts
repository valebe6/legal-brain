import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { KnowledgeBaseComponent } from './components/knowledge-base/knowledge-base.component';
import { DocumentManagerComponent } from './components/document-manager/document-manager.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    FeaturesComponent,
    KnowledgeBaseComponent,
    DocumentManagerComponent,
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
    <app-document-manager></app-document-manager>
    <app-pricing></app-pricing>
    <app-footer></app-footer>
  `
})
export class AppComponent {}
