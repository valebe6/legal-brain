import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  readonly size = input<'sm' | 'md' | 'lg'>('sm');
  readonly closeModal = output<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
