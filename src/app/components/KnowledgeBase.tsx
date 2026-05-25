import { BookOpen, FileText, Scale } from "lucide-react";

const doctrina = [
  "Manual de Derecho Policivo Tomo I",
  "Manual de Derecho Policivo Tomo II",
  "Cartilla de Contratación del Aprovechamiento Económico del Espacio Público"
];

const leyes = [
  "Ley 1801 de 2016 (Código de Convivencia)",
  "Ley 1437 de 2011 (CPACA)",
  "Ley 1333 de 2009 (Ambiental)",
  "Ley 1564 de 2012 (CGP)",
  "Ley 2079 de 2021",
  "Decreto 768 de 2025",
  "Ley 2450 de 2025 (Ruido)",
  "Ley 2474 de 2025 (Riesgo Animal)"
];

const jurisprudencia = [
  "SU-00157 de 2018 (Espacio Público)",
  "C-241 de 2010 (Juicios Civiles de Policía)"
];

export function KnowledgeBase() {
  return (
    <div className="py-24 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
          Base de Conocimiento
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Propiedad exclusiva y curaduría especializada
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border-2 border-chart-1/30 rounded-xl p-6 hover:border-chart-1 transition-all shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-chart-1" />
              <h3 className="text-xl font-semibold text-foreground">Doctrina Propia</h3>
            </div>
            <ul className="space-y-2">
              {doctrina.map((doc, index) => (
                <li key={index} className="text-foreground flex items-start gap-2">
                  <span className="text-chart-1 mt-1 font-bold">•</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border-2 border-chart-2/30 rounded-xl p-6 hover:border-chart-2 transition-all shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-chart-2" />
              <h3 className="text-xl font-semibold text-foreground">Leyes y Decretos</h3>
            </div>
            <ul className="space-y-2">
              {leyes.map((ley, index) => (
                <li key={index} className="text-foreground flex items-start gap-2">
                  <span className="text-chart-2 mt-1 font-bold">•</span>
                  <span className="text-sm">{ley}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border-2 border-chart-4/30 rounded-xl p-6 hover:border-chart-4 transition-all shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-8 h-8 text-chart-4" />
              <h3 className="text-xl font-semibold text-foreground">Jurisprudencia</h3>
            </div>
            <ul className="space-y-2">
              {jurisprudencia.map((sent, index) => (
                <li key={index} className="text-foreground flex items-start gap-2">
                  <span className="text-chart-4 mt-1 font-bold">•</span>
                  <span>{sent}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                + Sentencias fundacionales adicionales del acervo documental
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
