import { Component, inject, computed } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-knowledge-base',
  standalone: true,
  styles: [`
    .kb-section {
      padding: 6rem 1.5rem;
      background: linear-gradient(180deg, #e8eaf0 0%, rgba(212,215,224,0.3) 100%);
    }
    .kb-inner { max-width: 72rem; margin: 0 auto; }
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
    .kb-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    @media (min-width: 768px) {
      .kb-grid { grid-template-columns: repeat(3, 1fr); }
    }
    .kb-card {
      background: #ffffff;
      border: 2px solid rgba(192,196,208,0.5);
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.2s ease;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07);
    }
    .kb-card:hover { border-color: var(--accent-color); }
    .kb-card.c1:hover { border-color: #4a5fd8; }
    .kb-card.c2:hover { border-color: #2a9d8f; }
    .kb-card.c4:hover { border-color: #9b59b6; }
    .kb-card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .kb-card-header svg {
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
    }
    .kb-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #0f1419;
    }
    .kb-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .kb-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      color: #0f1419;
    }
    .bullet { font-weight: 700; margin-top: 0.1rem; flex-shrink: 0; }
    .text-sm-item { font-size: 0.875rem; }
    .kb-footer {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #c0c4d0;
    }
    .kb-footer p {
      font-size: 0.875rem;
      color: #4a5064;
      font-style: italic;
    }
  `],
  template: `
    <div class="kb-section">
      <div class="kb-inner">
        <h2>Base de Conocimiento</h2>
        <p class="section-subtitle">Propiedad exclusiva y curaduría especializada ({{ totalPages() }} páginas en total)</p>

        <div class="kb-grid">
          <div class="kb-card c1">
            <div class="kb-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4a5fd8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              <h3>Doctrina Propia</h3>
            </div>
            <ul class="kb-list">
              @for (doc of doctrina(); track doc) {
                <li>
                  <span class="bullet" style="color:#4a5fd8">•</span>
                  <span>{{doc}}</span>
                </li>
              }
            </ul>
          </div>

          <div class="kb-card c2">
            <div class="kb-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                <path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
              </svg>
              <h3>Leyes y Decretos</h3>
            </div>
            <ul class="kb-list">
              @for (ley of leyes(); track ley) {
                <li>
                  <span class="bullet" style="color:#2a9d8f">•</span>
                  <span class="text-sm-item">{{ley}}</span>
                </li>
              }
            </ul>
          </div>

          <div class="kb-card c4">
            <div class="kb-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#9b59b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m16 16 3-8 3 8c-.1.0-2 1-3 1s-2.9-.9-3-1z"/>
                <path d="m2 16 3-8 3 8c-.1.0-2 1-3 1s-2.9-.9-3-1z"/>
                <path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/>
              </svg>
              <h3>Jurisprudencia</h3>
            </div>
            <ul class="kb-list">
              @for (sent of jurisprudencia(); track sent) {
                <li>
                  <span class="bullet" style="color:#9b59b6">•</span>
                  <span>{{sent}}</span>
                </li>
              }
            </ul>
            <div class="kb-footer">
              <p>+ Sentencias fundacionales adicionales del acervo documental</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class KnowledgeBaseComponent {
  private readonly documentService = inject(DocumentService);

  readonly totalPages = this.documentService.totalPages;

  readonly doctrina = computed(() =>
    this.documentService.documents()
      .filter(doc => doc.category === 'doctrina')
      .map(doc => `${doc.title} (${doc.pages} pág.)`)
  );

  readonly leyes = computed(() =>
    this.documentService.documents()
      .filter(doc => doc.category === 'ley')
      .map(doc => `${doc.title} (${doc.pages} pág.)`)
  );

  readonly jurisprudencia = computed(() =>
    this.documentService.documents()
      .filter(doc => doc.category === 'jurisprudencia')
      .map(doc => `${doc.title} (${doc.pages} pág.)`)
  );
}
