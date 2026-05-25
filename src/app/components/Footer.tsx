import { Brain, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary via-secondary to-accent border-t-4 border-chart-3 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-8 h-8 text-chart-3" />
              <span className="text-xl font-bold text-white">El Cerebro Jurídico</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Plataforma de Inteligencia Artificial especializada en Derecho Policivo Colombiano.
              Desarrollada con tecnología RAG y supervisión experta del Dr. Arango.
            </p>
            <p className="text-xs text-chart-3 italic font-semibold">
              "¡Válgame el desquiciamiento!" - Enfoque crítico del Modelo Categorial
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Recursos</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="hover:text-chart-3 cursor-pointer transition-colors">Documentación</li>
              <li className="hover:text-chart-3 cursor-pointer transition-colors">Base de Conocimiento</li>
              <li className="hover:text-chart-3 cursor-pointer transition-colors">Términos de Servicio</li>
              <li className="hover:text-chart-3 cursor-pointer transition-colors">Política de Privacidad</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-chart-3" />
                <span>contacto@cerebrojuridico.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-chart-3" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-chart-3" />
                <span>Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
            <p>© 2026 El Cerebro Jurídico. Todos los derechos reservados.</p>
            <p className="text-xs">
              Powered by RAG Technology • WhatsApp Business API • Wompi & MercadoPago
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
