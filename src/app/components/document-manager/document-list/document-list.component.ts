import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentItem } from '../../../services/document.service';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Input({ required: true }) documents: DocumentItem[] = [];
  @Input({ required: true }) searchQuery = '';
  @Input({ required: true }) selectedCategory = 'all';

  @Output() onSearchQueryChange = new EventEmitter<string>();
  @Output() onCategoryChange = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<DocumentItem>();
  @Output() onDelete = new EventEmitter<string>();

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'doctrina': return 'Doctrina Propia';
      case 'ley': return 'Ley o Decreto';
      case 'jurisprudencia': return 'Jurisprudencia Hito';
      default: return category;
    }
  }

  updateSearchQuery(val: string): void {
    this.onSearchQueryChange.emit(val);
  }

  selectCategory(category: string): void {
    this.onCategoryChange.emit(category);
  }

  editDoc(doc: DocumentItem): void {
    this.onEdit.emit(doc);
  }

  deleteDoc(id: string): void {
    this.onDelete.emit(id);
  }
}
