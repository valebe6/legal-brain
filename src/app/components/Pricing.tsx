import { Check, CreditCard, Smartphone } from "lucide-react";

const plans = [
  {
    name: "Básico",
    price: "$49.000",
    period: "/mes",
    description: "Para funcionarios individuales",
    features: [
      "Acceso ilimitado por WhatsApp",
      "Base completa de 29 documentos",
      "Respuestas instantáneas 24/7",
      "Soporte HITL en 24h",
      "Validación por Device ID"
    ]
  },
  {
    name: "Institucional",
    price: "$299.000",
    period: "/mes",
    description: "Para entidades y dependencias",
    features: [
      "Todo lo del plan Básico",
      "Hasta 20 usuarios simultáneos",
      "Prioridad en soporte HITL",
      "Reportes de uso mensuales",
      "Soporte técnico dedicado",
      "Integración con sistemas propios"
    ],
    highlighted: true
  },
  {
    name: "Empresarial",
    price: "Contactar",
    period: "",
    description: "Para grandes organizaciones",
    features: [
      "Todo lo del plan Institucional",
      "Usuarios ilimitados",
      "SLA garantizado",
      "Capacitación personalizada",
      "API privada dedicada",
      "Documentos personalizados"
    ]
  }
];

export function Pricing() {
  return (
    <div className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Planes de Suscripción
        </h2>
        <p className="text-muted-foreground text-center mb-4 max-w-2xl mx-auto">
          Acceso seguro validado por número celular
        </p>
        <div className="flex items-center justify-center gap-2 mb-16">
          <CreditCard className="w-5 h-5 text-chart-1" />
          <span className="text-sm text-muted-foreground">Pagos con Wompi y MercadoPago</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 shadow-lg ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-primary to-secondary border-2 border-chart-3'
                  : 'bg-white border-2 border-border'
              }`}
            >
              {plan.highlighted && (
                <div className="bg-chart-3 text-foreground text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  Recomendado
                </div>
              )}

              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-foreground'}`}>{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/80' : 'text-muted-foreground'}`}>{plan.description}</p>

              <div className="mb-8">
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-foreground'}`}>{plan.price}</span>
                <span className={plan.highlighted ? 'text-white/70' : 'text-muted-foreground'}>{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      plan.highlighted ? 'text-chart-3' : 'text-chart-2'
                    }`} />
                    <span className={`text-sm ${plan.highlighted ? 'text-white' : 'text-foreground'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md ${
                plan.highlighted
                  ? 'bg-chart-3 hover:bg-chart-3/90 text-foreground hover:shadow-xl'
                  : 'bg-secondary hover:bg-primary text-white hover:shadow-xl'
              }`}>
                <Smartphone className="w-4 h-4" />
                {plan.price === "Contactar" ? "Contactar Ventas" : "Suscribirse"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
