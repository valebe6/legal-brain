import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upload-form.component.html',
  styleUrl: './upload-form.component.css'
})
export class UploadFormComponent {
  @Input() editingId: string | null = null;
  @Input() formData = {
    title: '',
    category: 'doctrina' as 'doctrina' | 'ley' | 'jurisprudencia',
    pages: 50
  };

  @Output() onSubmitForm = new EventEmitter<typeof this.formData>();
  @Output() onCancelEdit = new EventEmitter<void>();

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.formData.title.trim()) return;
    this.onSubmitForm.emit({
      title: this.formData.title.trim(),
      category: this.formData.category,
      pages: this.formData.pages
    });
  }

  cancelEdit(): void {
    this.onCancelEdit.emit();
  }
}
