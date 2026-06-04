import { Component, inject, computed } from '@angular/core';
import { DocumentService } from '../../services/document.service';

import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-knowledge-base',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './knowledge-base.component.html',
  styleUrl: './knowledge-base.component.css'
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
