import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react";

export const articles = [
  {
    id: "1",
    title: "Como lidar com a ansiedade no dia a dia",
    description: "Dicas práticas e exercícios de respiração para controlar momentos de crise e reduzir o estresse cotidiano.",
    content: `A ansiedade é uma resposta natural do corpo ao estresse, mas quando se torna constante, pode prejudicar a qualidade de vida. Para lidar com ela, é fundamental adotar práticas que ajudem na regulação do sistema nervoso.

1. **Respiração Diafragmática**: Inspire profundamente pelo nariz, expandindo o abdômen, e solte lentamente pela boca. Isso ativa o sistema parassimpático.
2. **Higiene Mental**: Reserve momentos para desconectar-se de telas e notícias que geram alerta.
3. **Foco no Presente**: Práticas de mindfulness ajudam a ancorar a mente no aqui e agora, reduzindo a ruminação sobre o futuro.`,
    category: "Ansiedade",
    author: "André Duarte",
    date: "15 Mai, 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1474418397713-7ded61d46e18?auto=format&fit=crop&q=80&w=800",
    bibliography: [
      {
        label: "Manual Diagnóstico e Estatístico de Transtornos Mentais (DSM-5-TR)",
        link: "https://www.psychiatry.org/psychiatrists/practice/dsm"
      },
      {
        label: "Sociedade Brasileira de Psicologia - Ansiedade",
        link: "https://www.sbp.com.br"
      }
    ]
  },
  {
    id: "2",
    title: "O impacto do sono na saúde mental",
    description: "Entenda a relação profunda entre uma boa noite de descanso e a regulação das suas emoções e humor.",
    content: `O sono não é apenas um período de repouso, mas um processo biológico essencial para a saúde do cérebro. Durante o sono profundo, nosso cérebro processa emoções e consolida memórias.

A privação de sono aumenta a reatividade emocional, tornando-nos mais suscetíveis à irritabilidade e ao pânico. Manter uma rotina consistente de sono ajuda a estabilizar o humor e melhora a clareza cognitiva.`,
    category: "Bem-estar",
    author: "André Duarte",
    date: "10 Mai, 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=800",
    bibliography: [
      {
        label: "Harvard Health - Sleep and Mental Health",
        link: "https://www.health.harvard.edu/newsletter_article/sleep-and-mental-health"
      },
      {
        label: "Associação Brasileira do Sono",
        link: "https://www.absono.com.br/"
      }
    ]
  },
  {
    id: "3",
    title: "EMDR: O que é e como funciona?",
    description: "Conheça a técnica de dessensibilização e reprocessamento através de movimentos oculares para tratar traumas.",
    content: `O EMDR (Eye Movement Desensitization and Reprocessing) é uma abordagem terapêutica eficaz para o tratamento de traumas. A técnica utiliza estimulação bilateral (visual, auditiva ou tátil) para ajudar o cérebro a reprocessar memórias traumáticas que ficaram "travadas" no sistema nervoso.

Muitas vezes, experiências difíceis não são devidamente processadas e continuam gerando sofrimento no presente. O EMDR permite que essas memórias sejam integradas de forma adaptativa.`,
    category: "Terapia",
    author: "André Duarte",
    date: "05 Mai, 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    bibliography: [
      {
        label: "EMDR Institute - What is EMDR?",
        link: "https://www.emdr.com/what-is-emdr/"
      },
      {
        label: "Associação EMDR Brasil",
        link: "https://emdr.org.br/"
      }
    ]
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-medium text-primary">Blog & Artigos</h1>
              <p className="text-muted-foreground mt-2">Conhecimento e reflexões sobre saúde mental e bem-estar</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary/90 text-white">
                    {article.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="font-serif text-2xl text-primary leading-tight hover:text-accent transition-colors cursor-pointer">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <CardDescription className="text-base line-clamp-3 mb-6">
                    {article.description}
                  </CardDescription>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-primary/5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{article.author}</span>
                    </div>
                    
                    <Link href={`/blog/${article.id}`}>
                      <Button variant="ghost" className="text-primary hover:text-accent p-0 h-auto group">
                        Ler mais
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
