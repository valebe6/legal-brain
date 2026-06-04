import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from '../../services/chat.service';

import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';
import { ChatSuggestionsComponent } from './chat-suggestions/chat-suggestions.component';

@Component({
  selector: 'app-chat-simulator',
  standalone: true,
  imports: [FormsModule, ChatBubbleComponent, ChatSuggestionsComponent],
  templateUrl: './chat-simulator.component.html',
  styleUrl: './chat-simulator.component.css'
})
export class ChatSimulatorComponent implements AfterViewChecked {
  private readonly chatService = inject(ChatService);

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  readonly chatState = signal<'closed' | 'open' | 'minimized'>('closed');
  readonly messages = this.chatService.messages;
  userInput = '';

  private escalatedMessages = new Set<ChatMessage>();

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.chatState() === 'open' && this.chatContainer) {
      try {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      } catch {}
    }
  }

  openChat(): void {
    this.chatState.set('open');
  }

  minimizeChat(): void {
    this.chatState.set('minimized');
  }

  closeChat(): void {
    this.chatState.set('closed');
  }

  sendInput(): void {
    if (!this.userInput.trim()) return;
    this.chatService.sendMessage(this.userInput.trim());
    this.userInput = '';
  }

  sendSuggestion(text: string): void {
    this.chatService.sendMessage(text);
  }

  hasEscalated(msg: ChatMessage): boolean {
    return this.escalatedMessages.has(msg);
  }

  escalate(msg: ChatMessage, phone: string): void {
    const lastUserMsg = this.getLastUserMessage();
    if (lastUserMsg) {
      this.chatService.escalateToHitl(lastUserMsg, phone);
      this.escalatedMessages.add(msg);
    }
  }

  private getLastUserMessage(): string {
    const list = this.messages();
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].sender === 'user') {
        return list[i].text;
      }
    }
    return '';
  }

  resetSession(): void {
    this.chatService.clearChatHistory();
    this.escalatedMessages.clear();
  }

  triggerWhatsApp(): void {
    alert('Simulando redirección a WhatsApp Business del Cerebro Jurídico...');
  }
}
