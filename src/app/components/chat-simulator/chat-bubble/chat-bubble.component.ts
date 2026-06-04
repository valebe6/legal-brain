import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ChatMessage } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './chat-bubble.component.html',
  styleUrl: './chat-bubble.component.css'
})
export class ChatBubbleComponent {
  @Input({ required: true }) msg!: ChatMessage;
  @Input({ required: true }) escalated!: boolean;
  @Output() onEscalate = new EventEmitter<string>();

  userPhone = '';

  escalate(): void {
    if (!this.userPhone.trim()) {
      alert('Por favor ingrese su número celular para validar el Device ID.');
      return;
    }
    this.onEscalate.emit(this.userPhone.trim());
    this.userPhone = '';
  }
}
