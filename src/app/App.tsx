import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { KnowledgeBase } from "./components/KnowledgeBase";
import { Pricing } from "./components/Pricing";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <KnowledgeBase />
      <Pricing />
      <Footer />
    </div>
  );
}