import { Injectable, signal } from '@angular/core';

export interface ChatMessage {
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: Date;
  isHitlEscalation?: boolean;
}

export interface PendingQuestion {
  id: string;
  question: string;
  userPhone: string;
  timestamp: Date;
}

export interface InjectedAnswer {
  question: string;
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly CHAT_HISTORY_KEY = 'legal_brain_chat_history';
  private readonly PENDING_QUESTIONS_KEY = 'legal_brain_pending_questions';
  private readonly INJECTED_ANSWERS_KEY = 'legal_brain_injected_answers';

  private readonly greetingMessage: ChatMessage = {
    sender: 'bot',
    text: '¡Saludos, estimado colega! Soy el Asistente de IA de El Cerebro Jurídico, modelado según el Modelo Categorial y el trialismo jurídico. Formule su duda sobre Derecho Policivo Colombiano y le responderé con estricto apego al acervo documental. Evitemos las colombianadas legislativas y la exégesis demencial.',
    timestamp: new Date()
  };

  private readonly _messages = signal<ChatMessage[]>([this.greetingMessage]);
  readonly messages = this._messages.asReadonly();

  private readonly _pendingQuestions = signal<PendingQuestion[]>(this.loadPending());
  readonly pendingQuestions = this._pendingQuestions.asReadonly();

  private readonly _injectedAnswers = signal<InjectedAnswer[]>(this.loadInjected());
  readonly injectedAnswers = this._injectedAnswers.asReadonly();

  constructor() {
    this.loadChatHistory();
  }

  private loadChatHistory(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.CHAT_HISTORY_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          this._messages.set(parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          })));
        } catch {
          this._messages.set([this.greetingMessage]);
        }
      }
    }
  }

  private loadPending(): PendingQuestion[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.PENDING_QUESTIONS_KEY);
      if (stored) {
        try {
          return JSON.parse(stored).map((q: any) => ({
            ...q,
            timestamp: new Date(q.timestamp)
          }));
        } catch {
          return [];
        }
      }
    }
    return [];
  }

  private loadInjected(): InjectedAnswer[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.INJECTED_ANSWERS_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return [];
        }
      }
    }
    return [];
  }

  private saveChat(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.CHAT_HISTORY_KEY, JSON.stringify(this._messages()));
    }
  }

  private savePending(list: PendingQuestion[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.PENDING_QUESTIONS_KEY, JSON.stringify(list));
    }
  }

  private saveInjected(list: InjectedAnswer[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.INJECTED_ANSWERS_KEY, JSON.stringify(list));
    }
  }

  sendMessage(text: string): void {
    const userMsg: ChatMessage = {
      sender: 'user',
      text,
      timestamp: new Date()
    };

    const currentMsgs = [...this._messages(), userMsg];
    this._messages.set(currentMsgs);
    this.saveChat();

    setTimeout(() => {
      this.generateBotResponse(text);
    }, 800);
  }

  private generateBotResponse(userText: string): void {
    const query = userText.toLowerCase().trim();
    let responseText = '';
    let isHitl = false;

    const matchedInjected = this._injectedAnswers().find(
      item => query.includes(item.question.toLowerCase().trim()) || item.question.toLowerCase().trim().includes(query)
    );

    if (matchedInjected) {
      responseText = `[Auto-Aprendido por HITL]: ${matchedInjected.answer}`;
    } else if (query.includes('ruido') || query.includes('2450')) {
      responseText = '¡Válgame el desquiciamiento! La Ley 2450 de 2025 sobre Ruido es otro ejemplo patente de la exégesis demencial y las colombianadas legislativas. Desde la doctrina del Modelo Categorial, pretender solucionar los conflictos de convivencia con meras prohibiciones de decibelios sin atender a la dimensión sociológica y axiológica del espacio público es un contrasentido absoluto. ¡Debemos aplicar el trialismo jurídico, no la simple coacción formalista!';
    } else if (query.includes('espacio público') || query.includes('00157') || query.includes('vendedor')) {
      responseText = 'El espacio público no es una entelequia puramente formal. La Sentencia SU-00157 de 2018 es un hito fundacional: establece que la restitución de bienes de uso público debe respetar la confianza legítima y los derechos de los vendedores informales. ¡Excluir al ciudadano de a pie sin alternativas dignas es caer en una exégesis demencial! El aprovechamiento económico debe regularse con la debida proporcionalidad y el trialismo jurídico, no con colombianadas expropiadoras.';
    } else if (query.includes('animal') || query.includes('2474') || query.includes('perro') || query.includes('gato')) {
      responseText = 'La Ley 2474 de 2025 sobre Riesgo Animal es bienintencionada en su faz axiológica, pero procedimentalmente colisiona con el Código de Convivencia (Ley 1801 de 2016). ¡Válgame el desquiciamiento! Llenar a los inspectores de policía con nuevas competencias sancionatorias de protección animal sin dotarlos de la más mínima infraestructura técnica ni de recursos presupuestales es la típica colombianada legislativa que sepulta la eficacia de la norma en el papel.';
    } else if (query.includes('código') || query.includes('1801') || query.includes('convivencia')) {
      responseText = 'La Ley 1801 de 2016 es el eje del derecho policivo. No obstante, su aplicación práctica sufre a menudo de una exégesis demencial por parte de funcionarios que confunden las medidas correctivas de policía con penas sancionatorias del derecho penal. El debido proceso debe reinar absoluto; de lo contrario, convertiremos la convivencia en una tiranía de inspectores desbocados y arbitrarios.';
    } else {
      responseText = 'Lo siento, no he podido encontrar información coincidente en mi acervo documental de doctrina propia, leyes clave o jurisprudencia autorizada. ¡Válgame el desquiciamiento, no pretenda que sea un exégeta demencial de todo el ordenamiento jurídico nacional! ¿Desea que escale esta consulta al Asesor Humano (Dr. Arango) para su resolución y posterior inyección en mi base de datos?';
      isHitl = true;
    }

    const botMsg: ChatMessage = {
      sender: 'bot',
      text: responseText,
      timestamp: new Date(),
      isHitlEscalation: isHitl
    };

    const updated = [...this._messages(), botMsg];
    this._messages.set(updated);
    this.saveChat();
  }

  escalateToHitl(question: string, phone: string): void {
    const newPending: PendingQuestion = {
      id: Math.random().toString(36).substring(2, 9),
      question,
      userPhone: phone,
      timestamp: new Date()
    };

    const updatedList = [...this._pendingQuestions(), newPending];
    this._pendingQuestions.set(updatedList);
    this.savePending(updatedList);

    const systemMsg: ChatMessage = {
      sender: 'system',
      text: `Consulta escalada con éxito al Dr. Arango. Datos de contacto: ${phone}. Recibirá respuesta en 24 horas y el conocimiento se inyectará automáticamente en mi base de datos.`,
      timestamp: new Date()
    };

    const updatedMsgs = [...this._messages(), systemMsg];
    this._messages.set(updatedMsgs);
    this.saveChat();
  }

  resolveQuestion(id: string, answerText: string): void {
    const questionItem = this._pendingQuestions().find(q => q.id === id);
    if (!questionItem) return;

    const newInjected: InjectedAnswer = {
      question: questionItem.question,
      answer: answerText
    };

    const updatedInjected = [...this._injectedAnswers(), newInjected];
    this._injectedAnswers.set(updatedInjected);
    this.saveInjected(updatedInjected);

    const updatedPending = this._pendingQuestions().filter(q => q.id !== id);
    this._pendingQuestions.set(updatedPending);
    this.savePending(updatedPending);
  }

  clearChatHistory(): void {
    this._messages.set([this.greetingMessage]);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.CHAT_HISTORY_KEY);
    }
    const systemMsg: ChatMessage = {
      sender: 'system',
      text: 'Sesión finalizada. Aislamiento de sesión completado (Memoria Cero habilitado por Hábeas Data).',
      timestamp: new Date()
    };
    this._messages.set([this.greetingMessage, systemMsg]);
  }
}
