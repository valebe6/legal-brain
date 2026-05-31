import { Component, inject, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ChatService, ChatMessage } from '../../services/chat.service';

@Component({
  selector: 'app-chat-simulator',
  standalone: true,
  imports: [FormsModule, DatePipe],
  styles: [`
    .chat-section {
      padding: 6rem 1.5rem;
      background: linear-gradient(180deg, rgba(212,215,224,0.3) 0%, #e8eaf0 100%);
      border-bottom: 1px solid #c0c4d0;
    }
    .chat-inner {
      max-width: 72rem;
      margin: 0 auto;
    }
    h2 {
      font-size: 2.25rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 0.5rem;
      color: #1a1d3a;
    }
    .section-subtitle {
      color: #4a5064;
      text-align: center;
      margin-bottom: 3rem;
      font-size: 1.1rem;
    }
    .web-chat-card {
      display: grid;
      grid-template-columns: 1fr;
      background: #111424;
      border: 2px solid #c0c4d0;
      border-radius: 0.75rem;
      height: 580px;
      overflow: hidden;
      box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    }
    @media (min-width: 768px) {
      .web-chat-card {
        grid-template-columns: 240px 1fr;
      }
    }
    .chat-sidebar {
      background: #171a2e;
      border-right: 1px solid rgba(255,255,255,0.08);
      display: none;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
    }
    @media (min-width: 768px) {
      .chat-sidebar {
        display: flex;
      }
    }
    .sidebar-header {
      padding: 1.25rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: rgba(255,255,255,0.6);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      flex-shrink: 0;
    }
    .chat-list {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.5rem;
      overflow-y: auto;
    }
    .chat-list-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .chat-list-item:hover {
      background-color: rgba(255,255,255,0.05);
    }
    .chat-list-item.active {
      background-color: rgba(255,255,255,0.08);
      border-left: 3px solid #2a9d8f;
    }
    .avatar-circle {
      width: 2.25rem;
      height: 2.25rem;
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
      width: 1.125rem;
      height: 1.125rem;
    }
    .avatar-circle.reset-avatar {
      background: rgba(196,30,58,0.1);
      border-color: #c41e3a;
      color: #c41e3a;
    }
    .chat-item-info {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .chat-item-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: #ffffff;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .chat-item-status {
      font-size: 0.75rem;
      color: #2a9d8f;
    }
    .chat-item-sub {
      font-size: 0.75rem;
      color: #4a5064;
    }
    .chat-window {
      display: flex;
      flex-direction: column;
      background: #111424;
      height: 100%;
      overflow: hidden;
    }
    .chat-window-header {
      background: #1a1d3a;
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      flex-shrink: 0;
    }
    .chat-header-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .chat-header-meta {
      display: flex;
      flex-direction: column;
    }
    .chat-bot-name {
      font-size: 0.95rem;
      font-weight: 600;
      color: #ffffff;
    }
    .chat-bot-status {
      font-size: 0.75rem;
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
    .btn-session-reset {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      color: #ffffff;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-session-reset:hover {
      background: #c41e3a;
      border-color: #c41e3a;
    }
    .chat-messages-area {
      flex: 1 1 0%;
      min-height: 0;
      padding: 1.5rem;
      overflow-y: auto;
      background: #111424;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      scroll-behavior: smooth;
    }
    .msg-bubble {
      max-width: 75%;
      padding: 0.875rem 1rem;
      border-radius: 0.75rem;
      font-size: 0.9rem;
      line-height: 1.5;
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
      max-width: 90%;
      background: rgba(233,180,76,0.1);
      border: 1px solid rgba(233,180,76,0.2);
      color: #e9b44c;
      text-align: center;
      font-size: 0.8rem;
      padding: 0.625rem 1rem;
      border-radius: 0.5rem;
      font-weight: 500;
    }
    .msg-time {
      font-size: 0.7rem;
      align-self: flex-end;
      opacity: 0.65;
      margin-top: 0.125rem;
    }
    .escalation-box {
      margin-top: 0.75rem;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 0.5rem;
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }
    .escalation-input {
      background: #111424;
      border: 1px solid rgba(255,255,255,0.15);
      color: #ffffff;
      padding: 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.85rem;
    }
    .escalation-input:focus {
      outline: none;
      border-color: #2a9d8f;
    }
    .btn-escalate {
      background: #e9b44c;
      color: #111424;
      border: none;
      padding: 0.5rem;
      border-radius: 0.375rem;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .btn-escalate:hover {
      background: rgba(233,180,76,0.9);
    }
    .chips-container {
      flex-shrink: 0;
      padding: 0.75rem 1.25rem;
      background: #111424;
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
      white-space: nowrap;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .suggestion-chip {
      background: #2a2e4d;
      border: 1px solid rgba(255,255,255,0.1);
      color: #ffffff;
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .suggestion-chip:hover {
      background: #3a4060;
      border-color: #e9b44c;
    }
    .chat-input-area {
      flex-shrink: 0;
      background: #1a1d3a;
      padding: 1rem 1.25rem;
      display: flex;
      gap: 0.75rem;
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    .chat-input {
      flex-grow: 1;
      background: #111424;
      border: 1px solid rgba(255,255,255,0.15);
      color: #ffffff;
      border-radius: 1.5rem;
      padding: 0.625rem 1.25rem;
      font-size: 0.9rem;
    }
    .chat-input:focus {
      outline: none;
      border-color: #2a9d8f;
    }
    .btn-send {
      width: 2.5rem;
      height: 2.5rem;
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
      background-color: rgba(42,157,143,0.9);
    }
    .btn-send svg {
      width: 1.125rem;
      height: 1.125rem;
      margin-left: 0.125rem;
    }
  `],
  template: `
    <div class="chat-section" id="ai-chat">
      <div class="chat-inner">
        <h2>Consola del Chat de IA</h2>
        <p class="section-subtitle">Interactúe en tiempo real con el Asistente de IA y simule el canal oficial</p>

        <div class="web-chat-card">
          <div class="chat-sidebar">
            <div class="sidebar-header">
              Canales Disponibles
            </div>
            <div class="chat-list">
              <div class="chat-list-item active">
                <div class="avatar-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div class="chat-item-info">
                  <div class="chat-item-name">Cerebro Jurídico IA</div>
                  <div class="chat-item-status">En línea</div>
                </div>
              </div>
              <div class="chat-list-item" (click)="resetSession()">
                <div class="avatar-circle reset-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                  </svg>
                </div>
                <div class="chat-item-info">
                  <div class="chat-item-name">Limpiar Memoria</div>
                  <div class="chat-item-sub">Sesión Independiente</div>
                </div>
              </div>
            </div>
          </div>

          <div class="chat-window">
            <div class="chat-window-header">
              <div class="chat-header-profile">
                <div class="avatar-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div class="chat-header-meta">
                  <span class="chat-bot-name">Cerebro Jurídico IA</span>
                  <span class="chat-bot-status">
                    <span class="status-dot"></span>
                    En línea
                  </span>
                </div>
              </div>

              <button class="btn-session-reset" (click)="resetSession()" title="Simula Memoria Cero / Aislamiento Legal">
                Nueva Sesión
              </button>
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
        </div>
      </div>
    </div>
  `
})
export class ChatSimulatorComponent implements AfterViewChecked {
  private readonly chatService = inject(ChatService);

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  readonly messages = this.chatService.messages;
  userInput = '';
  userPhone = '';

  private escalatedMessages = new Set<ChatMessage>();

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch {}
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
}
