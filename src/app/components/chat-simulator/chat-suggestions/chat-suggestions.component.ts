import { Component, Output, EventEmitter, signal } from '@angular/core';

interface Suggestion {
  label: string;
  query: string;
}

@Component({
  selector: 'app-chat-suggestions',
  standalone: true,
  templateUrl: './chat-suggestions.component.html',
  styleUrl: './chat-suggestions.component.css'
})
export class ChatSuggestionsComponent {
  @Output() selectSuggestion = new EventEmitter<string>();

  readonly suggestions = signal<Suggestion[]>([
    { label: 'Ley Ruido 🔊', query: '¿Qué opina del ruido y la Ley 2450?' },
    { label: 'Espacio Público ⚖️', query: '¿Cuáles son los límites del espacio público en la SU-00157?' },
    { label: 'Divorcio (RAG Fuera) ❌', query: '¿Cómo tramitar un divorcio express?' }
  ]);

  clickChip(query: string): void {
    this.selectSuggestion.emit(query);
  }
}
