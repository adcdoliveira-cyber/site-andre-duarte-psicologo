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
  },
  {
    id: "8",
    title: "Psicologia Clínica: Um Espaço de Transformação",
    description: "Entenda como a psicologia clínica pode ajudar na compreensão de si mesmo e na construção de uma vida mais autêntica.",
    content: `A psicologia clínica é muito mais do que apenas conversar sobre problemas. É um processo científico e humano de exploração profunda da psique. Através da relação terapêutica, o indivíduo encontra um espaço seguro para desconstruir padrões limitantes e reconstruir sua narrativa pessoal.

Neste espaço, trabalhamos não apenas os sintomas, mas as raízes do sofrimento, permitindo que a pessoa desenvolva maior autonomia e resiliência diante dos desafios da vida.`,
    category: "Psicologia Clínica",
    author: "André Duarte",
    date: "09 Jan, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    bibliography: []
  },
  {
    id: "9",
    title: "Trauma: Quando o Passado Permanece Presente",
    description: "O trauma não é apenas o que aconteceu, mas como seu sistema nervoso processou a experiência.",
    content: `O trauma psicológico ocorre quando uma experiência sobrecarrega a capacidade do indivíduo de processar o que está acontecendo. Isso pode resultar em memórias fragmentadas que continuam a disparar respostas de estresse no presente.

Compreender o trauma sob a ótica da neurobiologia nos permite usar ferramentas específicas para ajudar o cérebro a integrar essas experiências, transformando memórias traumáticas em memórias narrativas sem a carga emocional avassaladora.`,
    category: "Trauma",
    author: "André Duarte",
    date: "09 Jan, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1499209974431-9ddd3e2f0dc0?auto=format&fit=crop&q=80&w=800",
    bibliography: []
  },
  {
    id: "10",
    title: "Ansiedade: Compreendendo o Sistema de Alerta",
    description: "A ansiedade é um sinal do seu corpo tentando te proteger. Aprenda a dialogar com esse sistema.",
    content: `A ansiedade muitas vezes é vista como uma inimiga, mas originalmente ela é um mecanismo de sobrevivência. O problema surge quando esse alarme toca o tempo todo, mesmo sem perigo real.

Na terapia, aprendemos a identificar os gatilhos da ansiedade e a desenvolver estratégias de regulação emocional que acalmam o sistema nervoso, permitindo que você retome o controle da sua vida.`,
    category: "Ansiedade",
    author: "André Duarte",
    date: "09 Jan, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1474418397713-7ded61d46e18?auto=format&fit=crop&q=80&w=800",
    bibliography: []
  },
  {
    id: "11",
    title: "EMDR: Reprocessamento e Dessensibilização",
    description: "Conheça a técnica que utiliza movimentos oculares para tratar traumas e fobias de forma eficaz.",
    content: `O EMDR (Eye Movement Desensitization and Reprocessing) é uma das abordagens mais estudadas e eficazes para o tratamento de traumas. Através da estimulação bilateral, ajudamos o cérebro a 'desbloquear' memórias traumáticas.

Este processo permite que a carga emocional negativa associada ao evento seja reduzida, possibilitando uma nova perspectiva mais adaptativa e saudável sobre o ocorrido.`,
    category: "EMDR",
    author: "André Duarte",
    date: "09 Jan, 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    bibliography: []
  },
  {
    id: "12",
    title: "IFS: O Sistema da Família Interna",
    description: "Descubra como as diferentes 'partes' de você interagem e como encontrar o seu 'Self' central.",
    content: `O modelo IFS (Internal Family Systems) propõe que nossa mente é composta por várias subpersonalidades ou 'partes'. Algumas partes tentam nos proteger, enquanto outras carregam feridas do passado.

O objetivo da terapia IFS é ajudar o indivíduo a acessar seu 'Self' — um núcleo de calma, clareza e compaixão — para liderar e curar essas diferentes partes internas, trazendo harmonia ao sistema psíquico.`,
    category: "IFS",
    author: "André Duarte",
    date: "09 Jan, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1526069631228-723c945bea6b?auto=format&fit=crop&q=80&w=800",
    bibliography: []
  },
  {
    id: "13",
    title: "Abordagem Humanista: O Foco na Pessoa",
    description: "Uma visão da psicologia que valoriza a experiência subjetiva e o potencial de crescimento de cada ser humano.",
    content: `A abordagem humanista coloca a pessoa no centro do processo terapêutico. Acreditamos que cada indivíduo possui uma tendência inata para a autorrealização e o crescimento.

O papel do terapeuta é oferecer empatia, aceitação incondicional e autenticidade, criando o solo fértil necessário para que o cliente possa florescer e encontrar seus próprios caminhos.`,
    category: "Humanista",
    author: "André Duarte",
    date: "09 Jan, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1516589174184-c68d8e5f44df?auto=format&fit=crop&q=80&w=800",
    bibliography: []
  },
  {
    id: "14",
    title: "Teoria Polivagal: A Ciência da Segurança",
    description: "Entenda como seu sistema nervoso responde ao estresse e como encontrar o caminho de volta à calma e conexão.",
    content: `A Teoria Polivagal, desenvolvida pelo Dr. Stephen Porges, revolucionou nossa compreensão do sistema nervoso autônomo. Ela nos ensina que nosso corpo está constantemente escaneando o ambiente em busca de sinais de perigo ou segurança (neurocepção).

Quando nos sentimos seguros, nosso sistema de engajamento social é ativado, permitindo conexão e cura. Compreender esses estados nos ajuda a regular nossas respostas emocionais e a construir uma sensação de segurança interna durouros.`,
    category: "Neurociência",
    author: "André Duarte",
    date: "09 Jan, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
    bibliography: []
  },
  {
    id: "15",
    title: "Burnout: Quando o Trabalho Esgota a Mente",
    description: "Identifique os sinais do esgotamento profissional e aprenda estratégias para recuperar seu equilíbrio e saúde.",
    content: `O Burnout não é apenas cansaço; é um estado de exaustão física, emocional e mental causado por estresse prolongado no trabalho. Os sinais incluem despersonalização, redução da eficácia e um sentimento de vazio.

A recuperação exige mais do que apenas férias; envolve estabelecer limites saudáveis, reavaliar prioridades e, muitas vezes, um acompanhamento terapêutico para reconstruir a relação com a vida profissional e pessoal.`,
    category: "Saúde Mental",
    author: "André Duarte",
    date: "09 Jan, 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800",
    bibliography: []
  },
  {
    id: "16",
    title: "O Processo do Luto: Honrando a Dor",
    description: "O luto é uma resposta natural à perda. Entenda suas fases e como atravessar esse período com autocompaixão.",
    content: `O luto não é um caminho linear, mas um processo individual e profundo de adaptação a uma nova realidade sem algo ou alguém significativo. Não existe um tempo 'certo' para o luto.

Permitir-se sentir a dor, sem julgamentos, é fundamental para a integração da perda. A terapia oferece um suporte essencial para que o luto possa ser vivido de forma saudável, transformando a dor aguda em uma saudade integrada à vida.`,
    category: "Emoções",
    author: "André Duarte",
    date: "09 Jan, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1516589174184-c68d8e5f44df?auto=format&fit=crop&q=80&w=800",
    bibliography: []
  },
  {
    id: "17",
    title: "Regulação Emocional: Navegando nas Ondas",
    description: "Aprenda técnicas práticas para lidar com emoções intensas sem ser engolido por elas.",
    content: `Regulação emocional não significa suprimir o que sentimos, mas sim desenvolver a capacidade de manejar a intensidade das nossas emoções. É como aprender a surfar em vez de tentar parar as ondas.

Práticas de mindfulness, respiração consciente e a identificação precoce de gatilhos são ferramentas poderosas que nos permitem responder às situações em vez de apenas reagir impulsivamente a elas.`,
    category: "Bem-estar",
    author: "André Duarte",
    date: "09 Jan, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1499209974431-9ddd3e2f0dc0?auto=format&fit=crop&q=80&w=800",
    bibliography: []
  },
  {
    id: "18",
    title: "A Importância do Autocuidado Real",
    description: "Autocuidado vai além de um banho relaxante; trata-se de manter um compromisso ético com sua própria saúde mental.",
    content: `Muitas vezes o autocuidado é comercializado como algo superficial, mas o verdadeiro autocuidado envolve decisões difíceis: dizer não, estabelecer limites, dormir o suficiente e buscar ajuda profissional quando necessário.

É um ato de respeito por si mesmo que sustenta nossa capacidade de cuidar dos outros e de realizar nossos projetos de vida com vitalidade e propósito.`,
    category: "Bem-estar",
    author: "André Duarte",
    date: "09 Jan, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
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
                  <Link href={`/blog/${article.id}`} className="cursor-pointer">
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
                  </Link>
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
                  <Link href={`/blog/${article.id}`}>
                    <CardTitle className="font-serif text-2xl text-primary leading-tight hover:text-accent transition-colors cursor-pointer">
                      {article.title}
                    </CardTitle>
                  </Link>
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
