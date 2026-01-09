import { useParams, Link } from "wouter";
import { articles } from "./Blog";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User, BookOpen, ExternalLink } from "lucide-react";

export default function BlogPost() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
        <Link href="/blog">
          <Button>Voltar para o Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container max-w-4xl">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 group">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Voltar para o Blog
            </Button>
          </Link>

          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className="text-accent border-accent/20">
                {article.category}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {article.date} • {article.readTime}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl text-primary leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 py-4 border-y border-primary/5">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{article.author}</p>
                  <p className="text-xs text-muted-foreground">Psicólogo Clínico</p>
                </div>
              </div>
            </div>

            <img
              src={article.image}
              alt={article.title}
              className="w-full aspect-video object-cover rounded-2xl shadow-xl"
            />

            <div className="prose prose-slate lg:prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap pt-6">
              {article.content}
            </div>

            <div className="mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10 text-center">
              <h3 className="font-serif text-2xl text-primary mb-4">Pronto para dar o próximo passo?</h3>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Se você se identificou com este conteúdo e sente que precisa de suporte profissional, estou aqui para ajudar na sua jornada de autoconhecimento e cura.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/5521982525626" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="rounded-full px-8">
                    Agendar Consulta via WhatsApp
                  </Button>
                </a>
                <Link href="/blog">
                  <Button variant="outline" size="lg" className="rounded-full px-8">
                    Ver outros artigos
                  </Button>
                </Link>
              </div>
            </div>

            {article.bibliography && article.bibliography.length > 0 && (
              <div className="pt-12 border-t border-primary/10">
                <h4 className="flex items-center gap-2 font-serif text-2xl text-primary mb-6">
                  <BookOpen className="w-6 h-6 text-accent" />
                  Referências e Bibliografia
                </h4>
                <ul className="space-y-3">
                  {article.bibliography.map((ref, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between p-4 bg-secondary/10 rounded-xl group hover:bg-secondary/20 transition-colors"
                    >
                      <span className="font-medium text-primary/80">
                        {ref.label}
                      </span>
                      <a
                        href={ref.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 p-2"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
