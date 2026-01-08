import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react";

const articles = [
  {
    id: "1",
    title: "Como lidar com a ansiedade no dia a dia",
    description: "Dicas práticas e exercícios de respiração para controlar momentos de crise e reduzir o estresse cotidiano.",
    category: "Ansiedade",
    author: "André Duarte",
    date: "15 Mai, 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1474418397713-7ded61d46e18?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    title: "O impacto do sono na saúde mental",
    description: "Entenda a relação profunda entre uma boa noite de descanso e a regulação das suas emoções e humor.",
    category: "Bem-estar",
    author: "André Duarte",
    date: "10 Mai, 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    title: "EMDR: O que é e como funciona?",
    description: "Conheça a técnica de dessensibilização e reprocessamento através de movimentos oculares para tratar traumas.",
    category: "Terapia",
    author: "André Duarte",
    date: "05 Mai, 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
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
                <CardContent className="flex-grow">
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
                    <Button variant="ghost" className="text-primary hover:text-accent p-0 h-auto group">
                      Ler mais
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
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
