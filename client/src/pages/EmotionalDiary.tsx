import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Heart, Sparkles, Shield, MessageCircle, ArrowRight, Lock } from "lucide-react";

export default function EmotionalDiaryLanding() {
  const features = [
    {
      icon: <Heart className="w-6 h-6 text-accent" />,
      title: "Espaço Acolhedor",
      description: "Um lugar seguro para expressar seus sentimentos sem julgamentos."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-accent" />,
      title: "Acompanhamento",
      description: "Visualize sua jornada emocional e identifique padrões ao longo do tempo."
    },
    {
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "Privacidade Total",
      description: "Seus registros são criptografados e acessíveis apenas por você."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Sua jornada de autoconhecimento começa aqui
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl text-primary leading-tight">
              Um refúgio para suas <span className="italic text-accent">emoções</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              O Diário de Emoções é uma ferramenta pensada para ajudar você a processar o dia a dia, 
              organizar pensamentos e cultivar uma relação mais gentil consigo mesmo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-7 text-lg shadow-lg hover:shadow-xl transition-all group" asChild>
                <Link href="/login">
                  Entrar no meu Refúgio
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-md bg-white hover:shadow-lg transition-all p-6 text-center">
                <CardContent className="pt-6 space-y-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-xl text-primary font-medium">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-none shadow-2xl bg-primary text-primary-foreground rounded-[2rem] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-16 space-y-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                  Sua intimidade protegida com ética e cuidado.
                </h2>
                <p className="text-primary-foreground/80 text-lg leading-relaxed">
                  Assim como na terapia, o seu diário é um espaço de sigilo. 
                  Utilizamos tecnologia de ponta para garantir que suas reflexões 
                  sejam guardadas com a máxima segurança.
                </p>
                <div className="pt-4">
                  <Button variant="secondary" size="lg" className="rounded-full px-8" asChild>
                    <Link href="/login">Entrar na minha Área</Link>
                  </Button>
                </div>
              </div>
              <div className="bg-white/5 flex items-center justify-center p-8 md:p-16">
                <div className="relative w-full max-w-sm aspect-square bg-white/10 rounded-full flex items-center justify-center border border-white/20 animate-pulse">
                  <MessageCircle className="w-24 h-24 opacity-20" />
                  <Heart className="absolute top-1/4 right-1/4 w-8 h-8 text-accent animate-bounce" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
