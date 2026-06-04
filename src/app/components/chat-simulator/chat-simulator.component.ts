import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ChatService, ChatMessage } from '../../services/chat.service';

@Component({
  selector: 'app-chat-simulator',
  standalone: true,
  imports: [FormsModule, DatePipe],
  styles: [`
    /* Floating Buttons Wrapper */
    .floating-buttons-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.75rem;
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 99;
    }
    
    .floating-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-radius: 9999px;
      border: none;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.15), 0 4px 6px -2px rgba(0,0,0,0.05);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .floating-btn.whatsapp {
      background-color: #2a9d8f;
      color: #ffffff;
    }
    .floating-btn.whatsapp:hover {
      background-color: rgba(42, 157, 143, 0.9);
      transform: translateY(-2px);
    }
    
    .floating-btn.ai {
      background-color: #1a1d3a;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .floating-btn.ai:hover {
      background-color: #2a2e4d;
      transform: translateY(-2px);
      border-color: #e9b44c;
    }
    
    .floating-btn svg {
      width: 1.25rem;
      height: 1.25rem;
    }
    
    /* Floating Chat Window */
    .chat-window-floating {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 380px;
      height: 580px;
      background: #111424;
      border: 2px solid #c0c4d0;
      border-radius: 0.75rem;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
      z-index: 100;
      animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    @media (max-width: 480px) {
      .chat-window-floating {
        bottom: 1rem;
        right: 1rem;
        width: calc(100vw - 2rem);
        height: calc(100vh - 2rem);
      }
    }
    
    .chat-window-header {
      background: #1a1d3a;
      padding: 0.875rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      flex-shrink: 0;
    }
    
    .chat-header-profile {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .avatar-circle {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: #2a2e4d;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #e9b44c;
      border: 1.5px solid #e9b44c;
      flex-shrink: 0;
    }
    .avatar-circle svg {
      width: 1rem;
      height: 1rem;
    }
    
    .chat-header-meta {
      display: flex;
      flex-direction: column;
    }
    
    .chat-bot-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: #ffffff;
      line-height: 1.2;
    }
    
    .chat-bot-status {
      font-size: 0.7rem;
      color: #2a9d8f;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-weight: 500;
    }
    
    .status-dot {
      width: 0.375rem;
      height: 0.375rem;
      background-color: #2a9d8f;
      border-radius: 50%;
      display: inline-block;
    }
    
    .chat-header-actions {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .btn-header-action {
      background: none;
      border: none;
      color: rgba(255,255,255,0.6);
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-header-action:hover {
      color: #ffffff;
      background-color: rgba(255,255,255,0.1);
    }
    
    /* Minimized Bar Styles */
    .chat-minimized-bar {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 260px;
      background: #1a1d3a;
      border: 2px solid #c0c4d0;
      border-radius: 9999px;
      padding: 0.625rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.15);
      cursor: pointer;
      z-index: 100;
      transition: all 0.2s ease;
      animation: popIn 0.2s ease-out;
    }
    .chat-minimized-bar:hover {
      transform: translateY(-2px);
      border-color: #e9b44c;
    }
    
    .minimized-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #ffffff;
      font-size: 0.85rem;
      font-weight: 600;
    }
    
    .minimized-actions {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .btn-mini-action {
      background: none;
      border: none;
      color: rgba(255,255,255,0.6);
      cursor: pointer;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      transition: all 0.15s ease;
    }
    .btn-mini-action:hover {
      color: #ffffff;
      background-color: rgba(255,255,255,0.1);
    }
    
    /* Message Area */
    .chat-messages-area {
      flex: 1 1 0%;
      min-height: 0;
      padding: 1rem;
      overflow-y: auto;
      background: #111424;
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
      scroll-behavior: smooth;
    }
    
    .msg-bubble {
      max-width: 85%;
      padding: 0.75rem 0.875rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      line-height: 1.45;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .msg-bubble.user {
      align-self: flex-end;
      background: #2a9d8f;
      color: #ffffff;
      border-bottom-right-radius: 0.125rem;
    }
    .msg-bubble.bot {
      align-self: flex-start;
      background: #2a2e4d;
      color: #ffffff;
      border-bottom-left-radius: 0.125rem;
      border: 1px solid rgba(255,255,255,0.05);
    }
    .msg-bubble.system {
      align-self: center;
      max-width: 95%;
      background: rgba(233,180,76,0.1);
      border: 1px solid rgba(233,180,76,0.2);
      color: #e9b44c;
      text-align: center;
      font-size: 0.75rem;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      font-weight: 500;
    }
    .msg-time {
      font-size: 0.65rem;
      align-self: flex-end;
      opacity: 0.65;
      margin-top: 0.125rem;
    }
    
    .escalation-box {
      margin-top: 0.5rem;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 0.5rem;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .escalation-input {
      background: #111424;
      border: 1px solid rgba(255,255,255,0.15);
      color: #ffffff;
      padding: 0.375rem 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.8rem;
      width: 100%;
    }
    .escalation-input:focus {
      outline: none;
      border-color: #2a9d8f;
    }
    .btn-escalate {
      background: #e9b44c;
      color: #111424;
      border: none;
      padding: 0.375rem;
      border-radius: 0.375rem;
      font-weight: 600;
      font-size: 0.8rem;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .btn-escalate:hover {
      background: rgba(233,180,76,0.9);
    }
    
    /* Suggestions Area */
    .chips-container {
      flex-shrink: 0;
      padding: 0.5rem 0.75rem;
      background: #111424;
      display: flex;
      gap: 0.375rem;
      overflow-x: auto;
      white-space: nowrap;
      border-top: 1px solid rgba(255,255,255,0.05);
      scrollbar-width: none;
    }
    .chips-container::-webkit-scrollbar {
      display: none;
    }
    .suggestion-chip {
      background: #2a2e4d;
      border: 1px solid rgba(255,255,255,0.1);
      color: #ffffff;
      font-size: 0.75rem;
      padding: 0.375rem 0.75rem;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .suggestion-chip:hover {
      background: #3a4060;
      border-color: #e9b44c;
    }
    
    /* Input Area */
    .chat-input-area {
      flex-shrink: 0;
      background: #1a1d3a;
      padding: 0.75rem 1rem;
      display: flex;
      gap: 0.5rem;
      border-top: 1px solid rgba(255,255,255,0.08);
      align-items: center;
    }
    .chat-input {
      flex-grow: 1;
      background: #111424;
      border: 1px solid rgba(255,255,255,0.15);
      color: #ffffff;
      border-radius: 1.5rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
    .chat-input:focus {
      outline: none;
      border-color: #2a9d8f;
    }
    .btn-send {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      background: #2a9d8f;
      border: none;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.15s ease;
      flex-shrink: 0;
    }
    .btn-send:hover {
      background-color: rgba(42, 157, 143, 0.9);
    }
    .btn-send svg {
      width: 1rem;
      height: 1rem;
      margin-left: 0.125rem;
    }
    
    @keyframes slideUp {
      from {
        transform: translateY(30px) scale(0.95);
        opacity: 0;
      }
      to {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
    }
    
    @keyframes popIn {
      from {
        transform: scale(0.9);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
  `],
  template: `
    <!-- State 1: Closed - Show Floating Buttons -->
    @if (chatState() === 'closed') {
      <div class="floating-buttons-wrapper">
        <button class="floating-btn whatsapp" (click)="triggerWhatsApp()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
          </svg>
          Iniciar chat de WhatsApp
        </button>
        <button class="floating-btn ai" (click)="openChat()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Chat IA
        </button>
      </div>
    }

    <!-- State 2: Open - Show Chat Window -->
    @if (chatState() === 'open') {
      <div class="chat-window-floating">
        <div class="chat-window-header">
          <div class="chat-header-profile">
            <div class="avatar-circle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div class="chat-header-meta">
              <span class="chat-bot-name">Asistente IA</span>
              <span class="chat-bot-status">
                <span class="status-dot"></span>
                En línea
              </span>
            </div>
          </div>

          <div class="chat-header-actions">
            <!-- Reset memory icon button -->
            <button class="btn-header-action" (click)="resetSession()" title="Limpiar Memoria / Nueva Sesión">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 0.9rem; height: 0.9rem;">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            </button>
            <!-- Minimize window button -->
            <button class="btn-header-action" (click)="minimizeChat()" title="Minimizar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 0.9rem; height: 0.9rem;">
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            <!-- Close window button -->
            <button class="btn-header-action" (click)="closeChat()" title="Cerrar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 0.9rem; height: 0.9rem;">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="chat-messages-area" #chatContainer>
          @for (msg of messages(); track msg.timestamp) {
            <div class="msg-bubble" [class]="msg.sender">
              <span>{{ msg.text }}</span>

              @if (msg.isHitlEscalation && !hasEscalated(msg)) {
                <div class="escalation-box">
                  <input
                    type="tel"
                    class="escalation-input"
                    placeholder="Número Celular (Device ID)"
                    [(ngModel)]="userPhone"
                  />
                  <button class="btn-escalate" (click)="escalate(msg)">
                    Confirmar y Escalar (HITL)
                  </button>
                </div>
              }

              <span class="msg-time">{{ msg.timestamp | date:'shortTime' }}</span>
            </div>
          }
        </div>

        <div class="chips-container">
          <button class="suggestion-chip" (click)="sendSuggestion('¿Qué opina del ruido y la Ley 2450?')">
            Ley Ruido 🔊
          </button>
          <button class="suggestion-chip" (click)="sendSuggestion('¿Cuáles son los límites del espacio público en la SU-00157?')">
            Espacio Público ⚖️
          </button>
          <button class="suggestion-chip" (click)="sendSuggestion('¿Cómo tramitar un divorcio express?')">
            Divorcio (RAG Fuera) ❌
          </button>
        </div>

        <div class="chat-input-area">
          <input
            type="text"
            class="chat-input"
            placeholder="Escriba su consulta jurídica aquí..."
            [(ngModel)]="userInput"
            (keyup.enter)="sendInput()"
          />
          <button class="btn-send" (click)="sendInput()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    }

    <!-- State 3: Minimized - Show Compact Header Bar -->
    @if (chatState() === 'minimized') {
      <div class="chat-minimized-bar" (click)="openChat()">
        <div class="minimized-info">
          <div class="avatar-circle" style="width: 1.5rem; height: 1.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 0.75rem; height: 0.75rem;">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span>Asistente IA</span>
          <span class="status-dot" style="width: 0.3rem; height: 0.3rem; margin-left: 0.25rem;"></span>
        </div>
        <div class="minimized-actions" (click)="$event.stopPropagation()">
          <button class="btn-mini-action" (click)="openChat()" title="Expandir">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 0.8rem; height: 0.8rem;">
              <polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/>
            </svg>
          </button>
          <button class="btn-mini-action" (click)="closeChat()" title="Cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 0.8rem; height: 0.8rem;">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    }
  `
})
export class ChatSimulatorComponent implements AfterViewChecked {
  private readonly chatService = inject(ChatService);

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  readonly chatState = signal<'closed' | 'open' | 'minimized'>('closed');
  readonly messages = this.chatService.messages;
  userInput = '';
  userPhone = '';

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

  escalate(msg: ChatMessage): void {
    if (!this.userPhone.trim()) {
      alert('Por favor ingrese su número celular para validar el Device ID.');
      return;
    }
    const lastUserMsg = this.getLastUserMessage();
    if (lastUserMsg) {
      this.chatService.escalateToHitl(lastUserMsg, this.userPhone.trim());
      this.escalatedMessages.add(msg);
      this.userPhone = '';
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
