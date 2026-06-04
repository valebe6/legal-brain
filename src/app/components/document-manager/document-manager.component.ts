import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, DatePipe } from '@angular/common';
import { DocumentService, DocumentItem } from '../../services/document.service';
import { ChatService, PendingQuestion } from '../../services/chat.service';

@Component({
  selector: 'app-document-manager',
  standalone: true,
  imports: [FormsModule, DecimalPipe, DatePipe],
  styles: [`
    .admin-section {
      padding: 6rem 1.5rem;
      background-color: #ffffff;
      border-top: 1px solid #c0c4d0;
      border-bottom: 1px solid #c0c4d0;
    }
    .admin-inner {
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
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }
    .main-tab-bar {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2.5rem;
      border-bottom: 2px solid #e8eaf0;
      padding-bottom: 0.75rem;
    }
    .main-tab {
      background: none;
      border: none;
      padding: 0.5rem 1.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      color: #4a5064;
      cursor: pointer;
      position: relative;
      transition: color 0.15s ease;
    }
    .main-tab:hover {
      color: #1a1d3a;
    }
    .main-tab.active {
      color: #1a1d3a;
    }
    .main-tab.active::after {
      content: '';
      position: absolute;
      bottom: -0.875rem;
      left: 0;
      right: 0;
      height: 4px;
      background-color: #1a1d3a;
      border-radius: 2px;
    }
    .hitl-badge {
      background: #c41e3a;
      color: #ffffff;
      font-size: 0.75rem;
      padding: 0.125rem 0.375rem;
      border-radius: 9999px;
      margin-left: 0.5rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    @media (min-width: 640px) {
      .stats-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .stat-card {
      background: #f5f6fa;
      border: 1px solid #c0c4d0;
      border-radius: 0.75rem;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
    .stat-val {
      font-size: 2rem;
      font-weight: 700;
      color: #1a1d3a;
    }
    .stat-lbl {
      font-size: 0.875rem;
      color: #4a5064;
      margin-top: 0.25rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .main-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
    @media (min-width: 1024px) {
      .main-grid {
        grid-template-columns: 350px 1fr;
      }
    }
    .panel-card {
      background: #ffffff;
      border: 2px solid #c0c4d0;
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
      height: fit-content;
    }
    .panel-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a1d3a;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .form-group {
      margin-bottom: 1.25rem;
    }
    .form-group label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #0f1419;
      margin-bottom: 0.5rem;
    }
    .form-control {
      width: 100%;
      padding: 0.625rem 0.875rem;
      border: 1px solid #c0c4d0;
      border-radius: 0.5rem;
      background-color: #ffffff;
      color: #0f1419;
      font-size: 0.95rem;
      transition: border-color 0.15s ease;
    }
    .form-control:focus {
      outline: none;
      border-color: #1a1d3a;
      box-shadow: 0 0 0 3px rgba(26,29,58,0.1);
    }
    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }
    .btn-submit {
      width: 100%;
      background-color: #1a1d3a;
      color: #ffffff;
      padding: 0.75rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .btn-submit:hover {
      background-color: #2a2e4d;
    }
    .btn-cancel {
      width: 100%;
      background-color: #f5f6fa;
      color: #4a5064;
      padding: 0.75rem;
      border: 1px solid #c0c4d0;
      border-radius: 0.5rem;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 0.5rem;
      transition: background-color 0.15s ease;
    }
    .btn-cancel:hover {
      background-color: #e8eaf0;
    }
    .search-row {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    @media (min-width: 640px) {
      .search-row {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
    .search-input-wrapper {
      position: relative;
      flex-grow: 1;
      max-width: 24rem;
    }
    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.125rem;
      height: 1.125rem;
      color: #4a5064;
    }
    .search-control {
      padding-left: 2.25rem;
    }
    .filter-tabs {
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
      padding-bottom: 0.25rem;
    }
    .filter-tab {
      background: #f5f6fa;
      border: 1px solid #c0c4d0;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #4a5064;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .filter-tab:hover {
      background: #e8eaf0;
    }
    .filter-tab.active {
      background: #1a1d3a;
      color: #ffffff;
      border-color: #1a1d3a;
    }
    .doc-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .doc-item {
      background: #ffffff;
      border: 1px solid #c0c4d0;
      border-radius: 0.75rem;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: all 0.15s ease;
    }
    @media (min-width: 640px) {
      .doc-item {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
    .doc-item:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      border-color: #1a1d3a;
    }
    .doc-info {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }
    .doc-title {
      font-size: 1rem;
      font-weight: 600;
      color: #0f1419;
    }
    .doc-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.875rem;
      color: #4a5064;
    }
    .badge {
      padding: 0.125rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    .badge.doctrina {
      background-color: rgba(74,95,216,0.1);
      color: #4a5fd8;
    }
    .badge.ley {
      background-color: rgba(42,157,143,0.1);
      color: #2a9d8f;
    }
    .badge.jurisprudencia {
      background-color: rgba(155,89,182,0.1);
      color: #9b59b6;
    }
    .doc-actions {
      display: flex;
      gap: 0.5rem;
      flex-shrink: 0;
    }
    .btn-action {
      background: none;
      border: 1px solid #c0c4d0;
      border-radius: 0.375rem;
      width: 2.25rem;
      height: 2.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-action.edit:hover {
      background-color: rgba(233,180,76,0.1);
      border-color: #e9b44c;
      color: #e9b44c;
    }
    .btn-action.delete:hover {
      background-color: rgba(196,30,58,0.1);
      border-color: #c41e3a;
      color: #c41e3a;
    }
    .btn-action.resolve {
      border-color: #2a9d8f;
      color: #2a9d8f;
      width: auto;
      padding: 0 0.75rem;
      font-weight: 600;
      font-size: 0.85rem;
      display: flex;
      gap: 0.25rem;
    }
    .btn-action.resolve:hover {
      background-color: rgba(42,157,143,0.1);
      color: #2a9d8f;
    }
    .no-results {
      text-align: center;
      padding: 3rem;
      color: #4a5064;
      background: #f5f6fa;
      border-radius: 0.75rem;
      border: 1px dashed #c0c4d0;
    }
  `],
  template: `
    <div class="admin-section" id="document-manager">
      <div class="admin-inner">
        <h2>Panel del Administrador</h2>
        <p class="section-subtitle">Gestión del acervo de conocimiento y respuestas del Asesor Humano</p>

        <div class="main-tab-bar">
          <button
            class="main-tab"
            [class.active]="activeTab() === 'docs'"
            (click)="activeTab.set('docs')"
          >
            Base de Conocimiento
          </button>
          <button
            class="main-tab"
            [class.active]="activeTab() === 'hitl'"
            (click)="activeTab.set('hitl')"
          >
            Consultas Escaladas (HITL)
            @if (pendingQuestions().length > 0) {
              <span class="hitl-badge">{{ pendingQuestions().length }}</span>
            }
          </button>
        </div>

        @if (activeTab() === 'docs') {
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-val">{{ totalCount() }}</div>
              <div class="stat-lbl">Documentos Totales</div>
            </div>
            <div class="stat-card">
              <div class="stat-val">{{ totalPages() | number }}</div>
              <div class="stat-lbl">Páginas Totales</div>
            </div>
            <div class="stat-card">
              <div class="stat-val">{{ avgPages() | number:'1.0-0' }}</div>
              <div class="stat-lbl">Páginas Promedio</div>
            </div>
          </div>

          <div class="main-grid">
            <div class="panel-card">
              <h3 class="panel-title">
                @if (editingId()) {
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.25rem;height:1.25rem;color:#e9b44c">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                  </svg>
                  Editar Documento
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.25rem;height:1.25rem;color:#2a9d8f">
                    <path d="M5 12h14"/><path d="M12 5v14"/>
                  </svg>
                  Añadir Documento
                }
              </h3>

              <form (submit)="onSubmit($event)">
                <div class="form-group">
                  <label for="doc-title">Título del Documento</label>
                  <input
                    type="text"
                    id="doc-title"
                    class="form-control"
                    name="title"
                    [(ngModel)]="formData.title"
                    required
                    placeholder="Ej. Ley 1801 de 2016"
                  />
                </div>

                <div class="form-group">
                  <label for="doc-category">Categoría</label>
                  <select
                    id="doc-category"
                    class="form-control"
                    name="category"
                    [(ngModel)]="formData.category"
                    required
                  >
                    <option value="doctrina">Doctrina Propia</option>
                    <option value="ley">Ley o Decreto</option>
                    <option value="jurisprudencia">Jurisprudencia Hito</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="doc-pages">Número de Páginas</label>
                  <input
                    type="number"
                    id="doc-pages"
                    class="form-control"
                    name="pages"
                    [(ngModel)]="formData.pages"
                    required
                    min="1"
                  />
                </div>

                <button type="submit" class="btn-submit">
                  @if (editingId()) {
                    Guardar Cambios
                  } @else {
                    Agregar a la IA
                  }
                </button>

                @if (editingId()) {
                  <button type="button" class="btn-cancel" (click)="cancelEdit()">
                    Cancelar Edición
                  </button>
                }
              </form>
            </div>

            <div>
              <div class="search-row">
                <div class="search-input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                  </svg>
                  <input
                    type="text"
                    class="form-control search-control"
                    placeholder="Buscar documentos..."
                    [(ngModel)]="searchQuery"
                  />
                </div>

                <div class="filter-tabs">
                  <button
                    class="filter-tab"
                    [class.active]="selectedCategory() === 'all'"
                    (click)="selectedCategory.set('all')"
                  >
                    Todos
                  </button>
                  <button
                    class="filter-tab"
                    [class.active]="selectedCategory() === 'doctrina'"
                    (click)="selectedCategory.set('doctrina')"
                  >
                    Doctrina
                  </button>
                  <button
                    class="filter-tab"
                    [class.active]="selectedCategory() === 'ley'"
                    (click)="selectedCategory.set('ley')"
                  >
                    Leyes y Decretos
                  </button>
                  <button
                    class="filter-tab"
                    [class.active]="selectedCategory() === 'jurisprudencia'"
                    (click)="selectedCategory.set('jurisprudencia')"
                  >
                    Jurisprudencia
                  </button>
                </div>
              </div>

              <div class="doc-list">
                @for (doc of filteredDocuments(); track doc.id) {
                  <div class="doc-item">
                    <div class="doc-info">
                      <div class="doc-title">{{ doc.title }}</div>
                      <div class="doc-meta">
                        <span class="badge" [class]="doc.category">{{ getCategoryLabel(doc.category) }}</span>
                        <span>•</span>
                        <span>{{ doc.pages }} páginas</span>
                      </div>
                    </div>

                    <div class="doc-actions">
                      <button class="btn-action edit" title="Editar" (click)="startEdit(doc)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                        </svg>
                      </button>
                      <button class="btn-action delete" title="Eliminar" (click)="deleteDoc(doc.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                } @empty {
                  <div class="no-results">
                    No se encontraron documentos que coincidan con la búsqueda.
                  </div>
                }
              </div>
            </div>
          </div>
        } @else {
          <div class="main-grid">
            <div class="panel-card">
              <h3 class="panel-title">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1.25rem;height:1.25rem">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Responder como Dr. Arango
              </h3>

              @if (resolvingQuestion()) {
                <form (submit)="onSubmitResponse($event)">
                  <div class="form-group">
                    <label>Pregunta del Usuario</label>
                    <p style="font-size: 0.9rem; color: #4a5064; background: #f5f6fa; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #c0c4d0;">
                      "{{ resolvingQuestion()?.question }}"
                    </p>
                  </div>

                  <div class="form-group">
                    <label for="response-text">Respuesta Doctrinal</label>
                    <textarea
                      id="response-text"
                      class="form-control"
                      name="responseText"
                      [(ngModel)]="hitlResponseText"
                      required
                      placeholder="Redacte la respuesta doctrinal usando el enfoque del Modelo Categorial..."
                    ></textarea>
                  </div>

                  <button type="submit" class="btn-submit">
                    Inyectar Respuesta en la IA
                  </button>
                  <button type="button" class="btn-cancel" (click)="cancelResolve()">
                    Cancelar
                  </button>
                </form>
              } @else {
                <p style="font-size: 0.95rem; color: #4a5064; text-align: center; padding: 1.5rem 0;">
                  Seleccione una consulta de la lista para redactar la respuesta y auto-entrenar el bot.
                </p>
              }
            </div>

            <div>
              <div class="doc-list">
                @for (q of pendingQuestions(); track q.id) {
                  <div class="doc-item">
                    <div class="doc-info">
                      <div class="doc-title">"{{ q.question }}"</div>
                      <div class="doc-meta">
                        <span class="badge doctrina">Celular: {{ q.userPhone }}</span>
                        <span>•</span>
                        <span>{{ q.timestamp | date:'medium' }}</span>
                      </div>
                    </div>

                    <div class="doc-actions">
                      <button class="btn-action resolve" (click)="startResolve(q)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 1rem; height: 1rem">
                          <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                        </svg>
                        Responder
                      </button>
                    </div>
                  </div>
                } @empty {
                  <div class="no-results">
                    No hay consultas pendientes de escalar al Asesor Humano. ¡La IA está completamente capacitada!
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class DocumentManagerComponent {
  private readonly documentService = inject(DocumentService);
  private readonly chatService = inject(ChatService);

  readonly activeTab = signal<'docs' | 'hitl'>('docs');

  readonly totalPages = this.documentService.totalPages;
  readonly totalCount = this.documentService.totalCount;

  readonly avgPages = computed(() => {
    const count = this.totalCount();
    return count > 0 ? this.totalPages() / count : 0;
  });

  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('all');
  readonly editingId = signal<string | null>(null);

  formData = {
    title: '',
    category: 'doctrina' as 'doctrina' | 'ley' | 'jurisprudencia',
    pages: 50
  };

  readonly pendingQuestions = this.chatService.pendingQuestions;
  readonly resolvingQuestion = signal<PendingQuestion | null>(null);
  hitlResponseText = '';

  readonly filteredDocuments = computed(() => {
    let docs = this.documentService.documents();
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    if (query) {
      docs = docs.filter(doc => doc.title.toLowerCase().includes(query));
    }

    if (category !== 'all') {
      docs = docs.filter(doc => doc.category === category);
    }

    return docs;
  });

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'doctrina': return 'Doctrina Propia';
      case 'ley': return 'Ley o Decreto';
      case 'jurisprudencia': return 'Jurisprudencia Hito';
      default: return category;
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.formData.title.trim()) return;

    const id = this.editingId();
    if (id) {
      this.documentService.updateDocument(id, {
        title: this.formData.title.trim(),
        category: this.formData.category,
        pages: this.formData.pages
      });
      this.editingId.set(null);
    } else {
      this.documentService.addDocument({
        title: this.formData.title.trim(),
        category: this.formData.category,
        pages: this.formData.pages
      });
    }

    this.resetForm();
  }

  startEdit(doc: DocumentItem): void {
    this.editingId.set(doc.id);
    this.formData = {
      title: doc.title,
      category: doc.category,
      pages: doc.pages
    };
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.resetForm();
  }

  deleteDoc(id: string): void {
    this.documentService.deleteDocument(id);
    if (this.editingId() === id) {
      this.editingId.set(null);
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.formData = {
      title: '',
      category: 'doctrina',
      pages: 50
    };
  }

  startResolve(q: PendingQuestion): void {
    this.resolvingQuestion.set(q);
    this.hitlResponseText = '';
  }

  cancelResolve(): void {
    this.resolvingQuestion.set(null);
    this.hitlResponseText = '';
  }

  onSubmitResponse(event: Event): void {
    event.preventDefault();
    const q = this.resolvingQuestion();
    if (!q || !this.hitlResponseText.trim()) return;

    this.chatService.resolveQuestion(q.id, this.hitlResponseText.trim());
    this.resolvingQuestion.set(null);
    this.hitlResponseText = '';
  }
}
