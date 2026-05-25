import { Shield, Database, Users, Bot, Lock, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "API WhatsApp Business",
    description: "Acceso directo desde el bolsillo del funcionario. Canal exclusivo sin interfaces web complejas.",
    color: "text-chart-1"
  },
  {
    icon: Database,
    title: "Cero Alucinaciones (RAG)",
    description: "Si la respuesta no está en el acervo documental, la IA declara expresamente que no tiene la información.",
    color: "text-chart-2"
  },
  {
    icon: Lock,
    title: "Aislamiento de Sesiones",
    description: "Por mandato de Hábeas Data y debido proceso, cada chat es independiente. Memoria cero entre usuarios.",
    color: "text-chart-3"
  },
  {
    icon: Users,
    title: "Human-in-the-Loop",
    description: "Cuando el sistema no sabe, escala al Dr. Arango. Respuesta en 24h y auto-entrenamiento continuo.",
    color: "text-chart-4"
  },
  {
    icon: Bot,
    title: "Personalidad del Autor",
    description: "Estilo académico y crítico con el Modelo Categorial, trialismo jurídico y expresiones doctrinales únicas.",
    color: "text-chart-5"
  },
  {
    icon: Shield,
    title: "Seguridad y Paywall",
    description: "Pasarela de pago recurrente y validación por Device ID para evitar piratería de cuentas.",
    color: "text-chart-1"
  }
];

export function Features() {
  return (
    <div className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Arquitectura Tecnológica
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Cumplimiento técnico y jurídico garantizado para las exigencias del Estado
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border-2 border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all"
            >
              <feature.icon className={`w-10 h-10 ${feature.color} mb-4`} />
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
