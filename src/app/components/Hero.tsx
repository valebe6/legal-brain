import { Brain, MessageCircle } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Brain className="w-12 h-12 text-chart-3" />
          <h1 className="text-5xl font-bold text-white">
            El Cerebro Jurídico
          </h1>
        </div>

        <p className="text-xl text-white/90 text-center max-w-3xl mx-auto mb-8">
          Asistente de Inteligencia Artificial especializado en Derecho Policivo Colombiano
        </p>

        <p className="text-lg text-white/80 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
          Base de conocimiento con <span className="text-chart-3 font-semibold">29 documentos especializados</span> (~1,800 páginas)
          incluyendo doctrina propia, leyes clave, decretos y jurisprudencia fundacional
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button className="bg-chart-2 hover:bg-chart-2/90 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg">
            <MessageCircle className="w-5 h-5" />
            Iniciar Chat en WhatsApp
          </button>
          <button className="bg-white hover:bg-white/90 text-primary px-8 py-3 rounded-lg transition-colors shadow-lg">
            Ver Documentación
          </button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold text-chart-3">29</div>
            <div className="text-sm text-white/80 mt-1">Documentos</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold text-chart-3">~1,800</div>
            <div className="text-sm text-white/80 mt-1">Páginas</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold text-chart-3">24h</div>
            <div className="text-sm text-white/80 mt-1">Respuesta Humana</div>
          </div>
        </div>
      </div>
    </div>
  );
}
