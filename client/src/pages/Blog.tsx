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
  },
  {
    id: "4",
    title: "Ansiedade e Alerta: Por que não consigo relaxar?",
    description: "Quando o corpo não relaxa, a mente não desacelera e a sensação de perigo parece nunca passar.",
    content: `Viver em estado de alerta constante é exaustivo. A ansiedade não é apenas uma preocupação mental; é uma resposta fisiológica onde o corpo se prepara para lutar ou fugir de uma ameaça que muitas vezes não é visível.

Neste estado, o sistema nervoso simpático permanece ativado, resultando em tensão muscular, respiração curta e pensamentos acelerados. Entender que esse mecanismo é uma tentativa de proteção do seu cérebro é o primeiro passo para começar a reequilibrar seu sistema emocional e encontrar o caminho de volta ao relaxamento.`,
    category: "Ansiedade",
    author: "André Duarte",
    date: "10 Jan, 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=800",
    bibliography: []
  },
  {
    id: "5",
    title: "Trauma Psicológico: O passado que não passa",
    description: "Vivências do passado que permanecem ativas no presente, como lembranças intrusivas ou desconexão.",
    content: `O trauma não é o que aconteceu com você, mas o que aconteceu dentro de você como resultado daquela experiência. Muitas vezes, memórias dolorosas ficam armazenadas no cérebro de forma fragmentada, sem um senso de conclusão cronológica.

Isso faz com que, diante de gatilhos no presente, você sinta as mesmas emoções e sensações físicas do evento passado. A terapia ajuda a processar essas memórias para que elas se tornem parte da sua história, mas sem o peso e a ativação que causam sofrimento hoje.`,
    category: "Trauma",
    author: "André Duarte",
    date: "10 Jan, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1499209974431-9ddd3e2f0dc0?auto=format&fit=crop&q=80&w=800",
    bibliography: []
  },
  {
    id: "6",
    title: "Sofrimento Emocional e Vitalidade",
    description: "Cansaço interno, tristeza prolongada, sensação de vazio ou dificuldade de sentir prazer.",
    content: `O sofrimento emocional pode se manifestar como um peso invisível que drena sua energia vital. A sensação de vazio ou a dificuldade de sentir alegria não são sinais de fraqueza, mas indicadores de que algo profundo precisa de atenção.

Muitas vezes, a depressão e a tristeza prolongada são formas de o sistema dizer que está sobrecarregado. Recuperar a vitalidade envolve um processo gentil de reconexão consigo mesmo, permitindo sentir e processar as dores para que novos espaços de prazer e sentido possam surgir.`,
    category: "Bem-estar",
    author: "André Duarte",
    date: "10 Jan, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1494597564530-811f0a97ac3d?auto=format&fit=crop&q=80&w=800",
    bibliography: []
  },
  {
    id: "7",
    title: "Relacionamentos e Padrões que se Repetem",
    description: "Padrões que se repetem, conflitos constantes, medo de abandono ou dificuldade de entrega.",
    content: `Nossa forma de nos relacionarmos hoje é profundamente influenciada pelos nossos primeiros vínculos. Quando padrões de conflito ou medo de abandono se repetem, muitas vezes estamos operando sob dinâmicas antigas de sobrevivência emocional.

Reconhecer esses padrões é o caminho para construir relações mais saudáveis e autênticas. A terapia oferece um espaço seguro para explorar essas vulnerabilidades e desenvolver novas formas de comunicação e intimidade, baseadas na segurança e no respeito mútuo.`,
    category: "Relacionamentos",
    author: "André Duarte",
    date: "10 Jan, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1516589174184-c68d8e5f44df?auto=format&fit=crop&q=80&w=800",
    bibliography: []
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
