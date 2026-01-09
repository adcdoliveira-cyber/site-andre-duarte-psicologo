import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useDiary } from "@/hooks/useDiary";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Heart, MessageCircle, Trash2, ArrowLeft, Sparkles, Calendar, LogOut } from "lucide-react";
import { toast } from "sonner";

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

export default function EmotionalDiaryAuth() {
  const { user, logout, isAuthenticated } = useAuth();
  const { entries, isLoading, fetchEntries, addEntry, deleteEntry } = useDiary();
  const [, setLocation] = useLocation();
  
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState("");
  const [dailyQuote, setDailyQuote] = useState(psychologistQuotes[0]);
  const [showForm, setShowForm] = useState(false);

  // Redirecionar se não autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  // Carregar entradas ao montar
  useEffect(() => {
    if (isAuthenticated) {
      fetchEntries();
    }
  }, [isAuthenticated, fetchEntries]);

  // Selecionar citação aleatória
  useEffect(() => {
    const randomQuote = psychologistQuotes[Math.floor(Math.random() * psychologistQuotes.length)];
    setDailyQuote(randomQuote);
  }, []);

  const handleAddEntry = async () => {
    if (!currentEmotion || !notes.trim()) {
      toast.error("Por favor, selecione uma emoção e escreva suas reflexões.");
      return;
    }

    const success = await addEntry(currentEmotion, intensity, notes);
    if (success) {
      setCurrentEmotion("");
      setIntensity(5);
      setNotes("");
      setShowForm(false);
    }
  };

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const emotionColor = emotionColors[currentEmotion] || emotionColors.calmo;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container">
          {/* Header com informações do usuário */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-primary"
                />
              )}
              <div>
                <h1 className="text-4xl font-serif font-medium text-primary">Diário de Emoções</h1>
                <p className="text-muted-foreground">Bem-vindo, {user?.name}!</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="rounded-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Citação do Dia */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
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

              {/* Formulário */}
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
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Seleção de Emoção */}
                    <div className="space-y-3">
                      <label className="text-base font-semibold">Qual é sua emoção principal?</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {emotions.map((emotion) => (
                          <button
                            key={emotion}
                            onClick={() => setCurrentEmotion(emotion)}
                            className={`p-3 rounded-lg border-2 transition-all capitalize font-medium ${
                              currentEmotion === emotion
                                ? `${emotionColors[emotion].bg} ${emotionColors[emotion].border} ${emotionColors[emotion].text}`
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
                        <label className="text-base font-semibold">Intensidade</label>
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
                    </div>

                    {/* Notas */}
                    <div className="space-y-3">
                      <label className="text-base font-semibold">O que você está sentindo?</label>
                      <Textarea
                        placeholder="Descreva seus sentimentos..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-[150px] resize-none"
                      />
                    </div>

                    {/* Botões */}
                    <div className="flex gap-3">
                      <Button
                        onClick={handleAddEntry}
                        disabled={isLoading}
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

              {/* Entradas */}
              {entries.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-medium text-primary">Suas Reflexões</h2>
                  <div className="space-y-4">
                    {entries.map((entry) => (
                      <Card key={entry.id} className={`border-2 shadow-md ${emotionColors[entry.emotion]?.border || "border-gray-200"}`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${emotionColors[entry.emotion]?.bg} ${emotionColors[entry.emotion]?.text}`}>
                                {entry.emotion}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                {new Date(entry.createdAt).toLocaleDateString("pt-BR")}
                              </div>
                            </div>
                            <Button
                              onClick={() => deleteEntry(entry.id)}
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

              {entries.length === 0 && !showForm && (
                <Card className="border-none shadow-lg bg-gray-50">
                  <CardContent className="pt-12 pb-12 text-center">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhuma entrada ainda. Comece a registrar suas emoções!</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Coluna Lateral */}
            <div className="space-y-6">
              {/* Card de Informações */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent" />
                    Seus Dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-semibold text-foreground">{user?.email}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-muted-foreground">Total de Entradas</p>
                    <p className="font-semibold text-foreground text-lg">{entries.length}</p>
                  </div>
                </CardContent>
              </Card>

              {/* CTA WhatsApp */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="text-lg">Precisa de Apoio?</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://wa.me/5521982525626"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-6">
                      <MessageCircle className="mr-2 w-5 h-5" />
                      WhatsApp
                    </Button>
                  </a>
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
