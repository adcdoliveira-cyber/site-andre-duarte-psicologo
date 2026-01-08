import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { Heart, MessageCircle, Trash2, ArrowLeft, Sparkles, Calendar } from "lucide-react";
import { toast } from "sonner";

interface DiaryEntry {
  id: string;
  date: string;
  emotion: string;
  intensity: number;
  notes: string;
  timestamp: number;
}

const psychologistQuotes = [
  {
    text: "O que nos machuca nos torna mais fortes. A resiliência é a capacidade de se recuperar.",
    author: "Carl Rogers",
    specialty: "Psicologia Humanista"
  },
  {
    text: "A mente é tudo. O que você pensa, você se torna.",
    author: "Buda",
    specialty: "Filosofia Oriental"
  },
  {
    text: "Não é o que acontece com você, mas como você reage que importa.",
    author: "Epicteto",
    specialty: "Filosofia Estoica"
  },
  {
    text: "A ansiedade é o preço que pagamos por viver em um mundo incerto.",
    author: "Rollo May",
    specialty: "Psicologia Existencial"
  },
  {
    text: "O autoconhecimento é o primeiro passo para a transformação.",
    author: "Carl Jung",
    specialty: "Psicologia Analítica"
  },
  {
    text: "Somos responsáveis pela nossa própria felicidade e bem-estar.",
    author: "Albert Ellis",
    specialty: "Terapia Cognitivo-Comportamental"
  },
  {
    text: "A vulnerabilidade não é fraqueza, é coragem de ser autêntico.",
    author: "Brené Brown",
    specialty: "Pesquisa em Resiliência"
  },
  {
    text: "O trauma não é o que nos acontece, é o que guardamos dentro.",
    author: "Gabor Maté",
    specialty: "Medicina Psicossomática"
  },
  {
    text: "Cada emoção é uma mensagem valiosa do nosso corpo e mente.",
    author: "Marshall Rosenberg",
    specialty: "Comunicação Não-Violenta"
  },
  {
    text: "A aceitação é o primeiro passo para a mudança.",
    author: "Carl Rogers",
    specialty: "Psicologia Humanista"
  },
  {
    text: "Somos o que repetidamente fazemos. A excelência não é um ato, mas um hábito.",
    author: "Aristóteles",
    specialty: "Filosofia da Virtude"
  },
  {
    text: "O medo é apenas falta de informação. Conhecimento nos liberta.",
    author: "Paulo Freire",
    specialty: "Educação Libertadora"
  }
];

const emotionColors: Record<string, { bg: string; border: string; text: string }> = {
  feliz: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700" },
  triste: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  ansioso: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" },
  calmo: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700" },
  irritado: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
  esperançoso: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
  cansado: { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700" },
  confuso: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700" }
};

const emotions = ["feliz", "triste", "ansioso", "calmo", "irritado", "esperançoso", "cansado", "confuso"];

export default function EmotionalDiary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState("");
  const [dailyQuote, setDailyQuote] = useState(psychologistQuotes[0]);
  const [showForm, setShowForm] = useState(false);

  // Carregar dados do localStorage ao montar
  useEffect(() => {
    const savedEntries = localStorage.getItem("emotionalDiaryEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }

    // Selecionar citação aleatória
    const randomQuote = psychologistQuotes[Math.floor(Math.random() * psychologistQuotes.length)];
    setDailyQuote(randomQuote);
  }, []);

  // Salvar no localStorage sempre que entries mudar
  useEffect(() => {
    localStorage.setItem("emotionalDiaryEntries", JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = () => {
    if (!currentEmotion || !notes.trim()) {
      toast.error("Por favor, selecione uma emoção e escreva suas reflexões.");
      return;
    }

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("pt-BR"),
      emotion: currentEmotion,
      intensity,
      notes: notes.trim(),
      timestamp: Date.now()
    };

    setEntries([newEntry, ...entries]);
    setCurrentEmotion("");
    setIntensity(5);
    setNotes("");
    setShowForm(false);
    toast.success("Entrada registrada com sucesso! 💙");
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success("Entrada removida.");
  };

  const emotionColor = emotionColors[currentEmotion] || emotionColors.calmo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container">
          {/* Header com botão voltar */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-medium text-primary">Diário de Emoções</h1>
              <p className="text-muted-foreground mt-2">Um espaço seguro para explorar seus sentimentos</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Principal - Citação e Formulário */}
            <div className="lg:col-span-2 space-y-8">
              {/* Citação do Dia */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <CardTitle className="text-sm font-semibold text-muted-foreground">Reflexão do Dia</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <blockquote className="text-2xl font-serif italic text-primary leading-relaxed">
                    "{dailyQuote.text}"
                  </blockquote>
                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <div>
                      <p className="font-semibold text-primary">{dailyQuote.author}</p>
                      <p className="text-xs text-muted-foreground">{dailyQuote.specialty}</p>
                    </div>
                    <Heart className="w-5 h-5 text-accent fill-accent" />
                  </div>
                </CardContent>
              </Card>

              {/* Formulário de Nova Entrada */}
              {!showForm ? (
                <Button 
                  onClick={() => setShowForm(true)}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-lg shadow-lg"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Registrar Nova Emoção
                </Button>
              ) : (
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Como você está se sentindo?</CardTitle>
                    <CardDescription>Registre sua emoção e reflexões do momento</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Seleção de Emoção */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Qual é sua emoção principal?</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {emotions.map((emotion) => (
                          <button
                            key={emotion}
                            onClick={() => setCurrentEmotion(emotion)}
                            className={`p-3 rounded-lg border-2 transition-all capitalize font-medium ${
                              currentEmotion === emotion
                                ? `${emotionColors[emotion].bg} ${emotionColors[emotion].border} ${emotionColors[emotion].text} border-2`
                                : "bg-white border-gray-200 text-gray-600 hover:border-primary/30"
                            }`}
                          >
                            {emotion}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Intensidade */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">Intensidade</Label>
                        <span className="text-2xl font-bold text-primary">{intensity}/10</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={intensity}
                        onChange={(e) => setIntensity(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Leve</span>
                        <span>Intensa</span>
                      </div>
                    </div>

                    {/* Notas */}
                    <div className="space-y-3">
                      <Label htmlFor="notes" className="text-base font-semibold">O que você está sentindo?</Label>
                      <Textarea
                        id="notes"
                        placeholder="Descreva seus sentimentos, pensamentos e reflexões. Não há julgamento aqui, apenas acolhimento..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-[150px] resize-none rounded-lg border-primary/20 focus:border-primary"
                      />
                    </div>

                    {/* Botões */}
                    <div className="flex gap-3">
                      <Button
                        onClick={handleAddEntry}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-full py-6"
                      >
                        Salvar Entrada
                      </Button>
                      <Button
                        onClick={() => {
                          setShowForm(false);
                          setCurrentEmotion("");
                          setIntensity(5);
                          setNotes("");
                        }}
                        variant="outline"
                        className="flex-1 rounded-full py-6"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Entradas Recentes */}
              {entries.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-medium text-primary">Suas Reflexões</h2>
                  <div className="space-y-4">
                    {entries.map((entry) => (
                      <Card key={entry.id} className={`border-2 shadow-md ${emotionColors[entry.emotion].border}`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${emotionColors[entry.emotion].bg} ${emotionColors[entry.emotion].text}`}>
                                {entry.emotion}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                {entry.date}
                              </div>
                            </div>
                            <Button
                              onClick={() => handleDeleteEntry(entry.id)}
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-muted-foreground">Intensidade:</span>
                            <div className="flex gap-1">
                              {Array.from({ length: 10 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-6 rounded-sm ${
                                    i < entry.intensity ? "bg-primary" : "bg-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-foreground leading-relaxed whitespace-pre-wrap">{entry.notes}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Coluna Lateral - Informações e CTA */}
            <div className="space-y-6">
              {/* Card de Informações */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent" />
                    Bem-vindo ao seu Espaço
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-foreground/80">
                  <p>
                    Este é um espaço seguro e privado para você explorar e registrar suas emoções.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Seus dados são salvos apenas no seu navegador</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Nenhuma informação é compartilhada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Você tem total controle sobre suas anotações</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Card de Estatísticas */}
              {entries.length > 0 && (
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Suas Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total de Entradas</p>
                      <p className="text-2xl font-bold text-primary">{entries.length}</p>
                    </div>
                    <div className="p-3 bg-accent/5 rounded-lg">
                      <p className="text-sm text-muted-foreground">Emoção Mais Frequente</p>
                      <p className="text-lg font-semibold text-primary capitalize">
                        {Object.entries(
                          entries.reduce((acc, entry) => {
                            acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        ).sort(([, a], [, b]) => b - a)[0]?.[0] || "—"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* CTA WhatsApp */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="text-lg">Precisa de Apoio?</CardTitle>
                  <CardDescription>Fale com André Duarte</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://wa.me/5521982525626?text=Ol%C3%A1!%20Encontrei%20voc%C3%AA%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es,%20por%20favor."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-6">
                      <MessageCircle className="mr-2 w-5 h-5" />
                      Chamar no WhatsApp
                    </Button>
                  </a>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Segunda a Sexta, 09h às 18h
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
