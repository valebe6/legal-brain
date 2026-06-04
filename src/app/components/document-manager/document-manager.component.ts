import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, DatePipe } from '@angular/common';
import { DocumentService, DocumentItem } from '../../services/document.service';
import { ChatService, PendingQuestion } from '../../services/chat.service';

import { UploadFormComponent } from './upload-form/upload-form.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { HitlFeedbackComponent } from './hitl-feedback/hitl-feedback.component';

@Component({
  selector: 'app-document-manager',
  standalone: true,
  imports: [DecimalPipe, UploadFormComponent, DocumentListComponent, HitlFeedbackComponent],
  templateUrl: './document-manager.component.html',
  styleUrl: './document-manager.component.css'
})
export class DocumentManagerComponent {
  private readonly documentService = inject(DocumentService);
  private readonly chatService = inject(ChatService);

  readonly activeTab = signal<'docs' | 'hitl'>('docs');

  readonly totalPages = this.documentService.totalPages;
  readonly totalCount = this.documentService.totalCount;

  readonly avgPages = computed(() => {
    const count = this.totalCount();
    return count > 0 ? this.totalPages() / count : 0;
  });

  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('all');
  readonly editingId = signal<string | null>(null);

  formData = {
    title: '',
    category: 'doctrina' as 'doctrina' | 'ley' | 'jurisprudencia',
    pages: 50
  };

  readonly pendingQuestions = this.chatService.pendingQuestions;
  readonly resolvingQuestion = signal<PendingQuestion | null>(null);
  hitlResponseText = '';

  readonly filteredDocuments = computed(() => {
    let docs = this.documentService.documents();
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    if (query) {
      docs = docs.filter(doc => doc.title.toLowerCase().includes(query));
    }

    if (category !== 'all') {
      docs = docs.filter(doc => doc.category === category);
    }

    return docs;
  });

  onSubmit(data: { title: string, category: 'doctrina' | 'ley' | 'jurisprudencia', pages: number }): void {
    const id = this.editingId();
    if (id) {
      this.documentService.updateDocument(id, {
        title: data.title.trim(),
        category: data.category,
        pages: data.pages
      });
      this.editingId.set(null);
    } else {
      this.documentService.addDocument({
        title: data.title.trim(),
        category: data.category,
        pages: data.pages
      });
    }

    this.resetForm();
  }

  startEdit(doc: DocumentItem): void {
    this.editingId.set(doc.id);
    this.formData = {
      title: doc.title,
      category: doc.category,
      pages: doc.pages
    };
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.resetForm();
  }

  deleteDoc(id: string): void {
    this.documentService.deleteDocument(id);
    if (this.editingId() === id) {
      this.editingId.set(null);
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.formData = {
      title: '',
      category: 'doctrina',
      pages: 50
    };
  }

  startResolve(q: PendingQuestion): void {
    this.resolvingQuestion.set(q);
    this.hitlResponseText = '';
  }

  cancelResolve(): void {
    this.resolvingQuestion.set(null);
    this.hitlResponseText = '';
  }

  onSubmitResponse(): void {
    const q = this.resolvingQuestion();
    if (!q || !this.hitlResponseText.trim()) return;

    this.chatService.resolveQuestion(q.id, this.hitlResponseText.trim());
    this.resolvingQuestion.set(null);
    this.hitlResponseText = '';
  }
}
