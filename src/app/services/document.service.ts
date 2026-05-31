import { Injectable, signal, computed } from '@angular/core';

export interface DocumentItem {
  id: string;
  title: string;
  category: 'doctrina' | 'ley' | 'jurisprudencia';
  pages: number;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private readonly STORAGE_KEY = 'legal_brain_documents';

  private readonly initialDocuments: DocumentItem[] = [
    { id: '1', title: 'Manual de Derecho Policivo Tomo I', category: 'doctrina', pages: 350 },
    { id: '2', title: 'Manual de Derecho Policivo Tomo II', category: 'doctrina', pages: 320 },
    { id: '3', title: 'Cartilla de Contratación del Aprovechamiento Económico del Espacio Público', category: 'doctrina', pages: 120 },
    { id: '4', title: 'Proyecciones Comerciales', category: 'doctrina', pages: 50 },
    { id: '5', title: 'Ley 1801 de 2016 (Código de Convivencia)', category: 'ley', pages: 150 },
    { id: '6', title: 'Ley 1437 de 2011 (CPACA)', category: 'ley', pages: 100 },
    { id: '7', title: 'Ley 1333 de 2009 (Ambiental)', category: 'ley', pages: 80 },
    { id: '8', title: 'Ley 1564 de 2012 (CGP)', category: 'ley', pages: 160 },
    { id: '9', title: 'Ley 2079 de 2021', category: 'ley', pages: 40 },
    { id: '10', title: 'Decreto 768 de 2025', category: 'ley', pages: 30 },
    { id: '11', title: 'Ley 2450 de 2025 (Ruido)', category: 'ley', pages: 25 },
    { id: '12', title: 'Ley 2474 de 2025 (Riesgo animal)', category: 'ley', pages: 20 },
    { id: '13', title: 'Decreto 1076 de 2015', category: 'ley', pages: 50 },
    { id: '14', title: 'Decreto 1077 de 2015', category: 'ley', pages: 45 },
    { id: '15', title: 'Ley 99 de 1993', category: 'ley', pages: 35 },
    { id: '16', title: 'Ley 388 de 1997', category: 'ley', pages: 40 },
    { id: '17', title: 'Decreto 840 de 2019', category: 'ley', pages: 20 },
    { id: '18', title: 'Ley 142 de 1994', category: 'ley', pages: 30 },
    { id: '19', title: 'Decreto 555 de 2021', category: 'ley', pages: 35 },
    { id: '20', title: 'SU-00157 de 2018 (Espacio Público)', category: 'jurisprudencia', pages: 60 },
    { id: '21', title: 'C-241 de 2010 (Juicios Civiles de Policía)', category: 'jurisprudencia', pages: 50 },
    { id: '22', title: 'T-035 de 2019', category: 'jurisprudencia', pages: 25 },
    { id: '23', title: 'C-204 de 2019', category: 'jurisprudencia', pages: 40 },
    { id: '24', title: 'C-223 de 2017', category: 'jurisprudencia', pages: 35 },
    { id: '25', title: 'T-211 de 2020', category: 'jurisprudencia', pages: 20 },
    { id: '26', title: 'C-349 de 2017', category: 'jurisprudencia', pages: 30 },
    { id: '27', title: 'STC-1234 de 2024', category: 'jurisprudencia', pages: 15 },
    { id: '28', title: 'T-456 de 2021', category: 'jurisprudencia', pages: 25 },
    { id: '29', title: 'C-117 de 2021', category: 'jurisprudencia', pages: 30 }
  ];

  private readonly _documents = signal<DocumentItem[]>(this.loadInitial());

  readonly documents = this._documents.asReadonly();

  readonly totalPages = computed(() => {
    return this._documents().reduce((acc, doc) => acc + (doc.pages || 0), 0);
  });

  readonly totalCount = computed(() => this._documents().length);

  private loadInitial(): DocumentItem[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return this.initialDocuments;
        }
      }
    }
    return this.initialDocuments;
  }

  private save(docs: DocumentItem[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(docs));
    }
  }

  addDocument(doc: Omit<DocumentItem, 'id'>): void {
    const newDoc: DocumentItem = {
      ...doc,
      id: Math.random().toString(36).substring(2, 9)
    };
    const updated = [...this._documents(), newDoc];
    this._documents.set(updated);
    this.save(updated);
  }

  updateDocument(id: string, updatedFields: Partial<Omit<DocumentItem, 'id'>>): void {
    const updated = this._documents().map(doc => {
      if (doc.id === id) {
        return { ...doc, ...updatedFields };
      }
      return doc;
    });
    this._documents.set(updated);
    this.save(updated);
  }

  deleteDocument(id: string): void {
    const updated = this._documents().filter(doc => doc.id !== id);
    this._documents.set(updated);
    this.save(updated);
  }
}
