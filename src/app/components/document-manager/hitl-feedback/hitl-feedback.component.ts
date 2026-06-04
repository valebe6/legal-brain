import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PendingQuestion } from '../../../services/chat.service';

@Component({
  selector: 'app-hitl-feedback',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './hitl-feedback.component.html',
  styleUrl: './hitl-feedback.component.css'
})
export class HitlFeedbackComponent {
  @Input({ required: true }) pendingQuestions: PendingQuestion[] = [];
  @Input() resolvingQuestion: PendingQuestion | null = null;
  @Input() hitlResponseText = '';

  @Output() hitlResponseTextChange = new EventEmitter<string>();
  @Output() onSubmitResponse = new EventEmitter<void>();
  @Output() onCancelResolve = new EventEmitter<void>();
  @Output() onStartResolve = new EventEmitter<PendingQuestion>();

  updateResponseText(val: string): void {
    this.hitlResponseTextChange.emit(val);
  }

  submitResponse(event: Event): void {
    event.preventDefault();
    this.onSubmitResponse.emit();
  }

  cancelResolve(): void {
    this.onCancelResolve.emit();
  }

  startResolve(q: PendingQuestion): void {
    this.onStartResolve.emit(q);
  }
}
