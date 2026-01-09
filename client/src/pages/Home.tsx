import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Brain, Heart, Home as HomeIcon, MessageCircle, Shield, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import andreFotoPerfil from "@assets/Andre-Psicólogo-RJ-Barra-da-Tijuca-TCC-ANSIEDADE-NAMORO-online_1767929734996.png";

export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }, []);

  const specialties = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Ansiedade e Alerta",
      description: "Quando o corpo não relaxa, a mente não desacelera e a sensação de perigo parece nunca passar."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trauma Psicológico",
      description: "Vivências do passado que permanecem ativas no presente, como lembranças intrusivas ou desconexão."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Sofrimento Emocional",
      description: "Cansaço interno, tristeza prolongada, sensação de vazio ou dificuldade de sentir prazer e vitalidade."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Relacionamentos",
      description: "Padrões que se repetem, conflitos constantes, medo de proximidade ou exaustão emocional."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground overflow-x-hidden">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero_consultorio.webp" 
              alt="Consultório de Psicologia Acolhedor" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40 md:via-background/70 md:to-transparent"></div>
          </div>

          <div className="container relative z-10 py-12 md:py-24">
            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                CRP: 05 71020
              </div>
              
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-tight text-primary mb-6">
                Compreender e construir <span className="italic text-accent">novos caminhos</span>.
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Um espaço de escuta segura, ética e respeitosa para quem busca cuidado com o trauma, ansiedade e regulação emocional.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Agendar Consulta
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-lg bg-white/50 backdrop-blur-sm" asChild>
                  <Link href="/diario">Conhecer o Diário</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary/50 hidden md:block">
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-current rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Sobre Mim Section */}
        <section id="sobre" className="py-20 md:py-32 bg-secondary/30 relative">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="relative z-10 overflow-hidden shadow-2xl aspect-square max-w-md mx-auto lg:mx-0" style={{ clipPath: 'path("M10,100 Q10,10 100,10 T190,100 Q190,190 100,190 T10,100")' }}>
                  <img 
                    src={andreFotoPerfil} 
                    alt="Psicólogo André Duarte" 
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl z-0"></div>
                <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary/10 rounded-full blur-2xl z-0"></div>
              </div>
              
              <div className="order-1 lg:order-2 space-y-8">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">Olá, sou André Duarte</h2>
                  <div className="w-20 h-1 bg-accent rounded-full"></div>
                </div>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Sou psicólogo clínico e atuo com uma abordagem integrativa e humanista. Meu trabalho é voltado à construção de um espaço seguro, onde seja possível compreender o que está acontecendo internamente e reduzir o impacto do sofrimento no cotidiano.
                  </p>
                  <p>
                    Integro recursos como <strong>EMDR</strong>, <strong>Teoria Polivagal</strong>, <strong>Abordagem Centrada na Pessoa</strong> e <strong>IFS</strong> (Internal Family Systems), sempre de forma criteriosa e ajustada ao momento de cada pessoa.
                  </p>
                  <p>
                    Acredito que mesmo quando tudo parece difícil, existe uma parte em nós capaz de curar e se reconectar. O processo terapêutico é o caminho para acessar essa capacidade.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {["Psicologia Clínica", "Trauma", "Ansiedade", "EMDR", "IFS", "Humanista"].map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-white rounded-full text-sm text-primary border border-primary/10 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Como Posso Ajudar Section */}
        <section id="servicos" className="py-20 md:py-32 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl text-primary">Como posso ajudar?</h2>
              <p className="text-lg text-muted-foreground">
                A psicoterapia pode ajudar em momentos em que o sofrimento começa a ocupar espaço demais na vida, mesmo quando não há um motivo claro ou recente para isso.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialties.map((item, index) => {
                const articleIdMap: Record<string, string> = {
                  "Ansiedade e Alerta": "4",
                  "Trauma Psicológico": "5",
                  "Sofrimento Emocional": "6",
                  "Relacionamentos": "7"
                };
                const articleId = articleIdMap[item.title];
                
                return (
                  <Link key={index} href={articleId ? `/blog/${articleId}` : "/blog"}>
                    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white group overflow-hidden cursor-pointer h-full">
                      <CardContent className="p-8 space-y-4 relative h-full">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/30 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                        
                        <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 relative z-10">
                          {item.icon}
                        </div>
                        
                        <h3 className="font-serif text-xl font-medium text-primary pt-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                        <div className="pt-2 text-accent font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Saber mais <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="mt-16 text-center">
              <div className="inline-block p-8 bg-secondary/20 rounded-2xl max-w-4xl">
                <div className="flex flex-col md:flex-row items-center gap-6 text-left">
                  <div className="bg-white p-4 rounded-full shadow-sm shrink-0">
                    <Sparkles className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-primary mb-2">Abordagem Integrativa</h4>
                    <p className="text-muted-foreground">
                      O objetivo não é apenas aliviar sintomas, mas compreender como o sofrimento se organiza e criar condições para mudanças mais profundas e sustentáveis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modalidades de Atendimento */}
        <section id="atendimento" className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl mb-4">Modalidades de Atendimento</h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                Escolha o formato que melhor se adapta à sua rotina e necessidade. Ambos oferecem o mesmo cuidado, ética e sigilo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Online */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/10 transition-colors duration-300">
                <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg rotate-3">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl mb-4">Atendimento Online</h3>
                <ul className="space-y-3 text-primary-foreground/80 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    Acesso à psicoterapia de qualquer lugar
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    Maior flexibilidade de horários
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    Economia de tempo e deslocamento
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                    Plataforma segura e criptografada
                  </li>
                </ul>
                <Button variant="secondary" className="w-full rounded-full">
                  Saiba mais sobre Online
                </Button>
              </div>

              {/* Presencial */}
              <div className="bg-white text-primary rounded-3xl p-8 md:p-12 shadow-2xl transform md:-translate-y-4 border-4 border-white/20">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg -rotate-3">
                  <HomeIcon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl mb-4">Atendimento Presencial</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Na Barra da Tijuca. Um espaço físico de pausa e cuidado, favorecendo a sensação de presença e sustentação emocional.
                </p>
                <ul className="space-y-3 text-muted-foreground mb-8">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Contato direto e acolhedor
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Ambiente preparado para o cuidado
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Escuta integrada (fala e corpo)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Localização acessível no Downtown
                  </li>
                </ul>
                <Button className="w-full bg-primary text-white hover:bg-primary/90 rounded-full">
                  Ver Localização
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Preview Section */}
        <BlogPreview />

        {/* Contato e Mapa */}
        <section id="contato" className="py-20 bg-secondary/20">
          <div className="container">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-10 md:p-16 space-y-8">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">Entre em Contato</h2>
                  <p className="text-muted-foreground">
                    Se você sente que está carregando mais do que consegue sozinho, a psicoterapia pode ser um caminho possível.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div className="bg-white p-3 rounded-full shadow-sm text-primary">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary">WhatsApp / Telefone</h4>
                      <p className="text-muted-foreground text-sm mb-2">Segunda a Sexta, 09h às 18h</p>
                      <a href="tel:+5521982525626" className="text-lg font-semibold text-primary hover:text-accent transition-colors">
                        (21) 98252-5626
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div className="bg-white p-3 rounded-full shadow-sm text-primary">
                      <HomeIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary">Consultório</h4>
                      <p className="text-muted-foreground text-sm">
                        Av. das Américas, 500 - Bloco 21<br />
                        Portaria A - Sala 225 - Downtown<br />
                        Barra da Tijuca, Rio de Janeiro - RJ
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-6 text-lg shadow-md hover:shadow-lg transition-all">
                  Chamar no WhatsApp
                </Button>
              </div>

              <div className="lg:w-1/2 bg-gray-200 min-h-[400px] relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.1166666666666!2d-43.32222222222222!3d-23.000000000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd0a0a0a0a0a0%3A0x0!2sAv.%20das%20Am%C3%A9ricas%2C%20500%20-%20Barra%20da%20Tijuca%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2022640-100!5e0!3m2!1sen!2sbr!4v1620000000000!5m2!1sen!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function BlogPreview() {
  const articles = [
    {
      title: "Como lidar com a ansiedade",
      category: "Ansiedade",
      date: "15 Mai, 2024",
      image: "https://images.unsplash.com/photo-1474418397713-7ded61d46e18?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "O impacto do sono",
      category: "Bem-estar",
      date: "10 Mai, 2024",
      image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "EMDR: O que é?",
      category: "Terapia",
      date: "05 Mai, 2024",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-2">Blog & Artigos</h2>
            <p className="text-muted-foreground">Conteúdos sobre saúde mental e autocuidado</p>
          </div>
          <Button variant="outline" className="rounded-full hidden md:flex" asChild>
            <Link href="/blog">Ver todos os artigos</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <Card key={i} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all group">
              <div className="aspect-video relative overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">{article.category}</span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="font-serif text-xl text-primary mb-4 group-hover:text-accent transition-colors">{article.title}</h3>
                <Button variant="link" className="p-0 h-auto text-primary group-hover:text-accent" asChild>
                  <Link href="/blog">Ler mais <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 md:hidden text-center">
          <Button variant="outline" className="rounded-full w-full" asChild>
            <Link href="/blog">Ver todos os artigos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
