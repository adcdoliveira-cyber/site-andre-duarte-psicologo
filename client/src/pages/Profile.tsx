import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useDiary } from "@/hooks/useDiary";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, LogOut, Heart, Calendar, TrendingUp } from "lucide-react";

export default function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const { entries, fetchEntries } = useDiary();
  const [, setLocation] = useLocation();

  // Redirecionar se não autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  // Carregar entradas
  useEffect(() => {
    if (isAuthenticated) {
      fetchEntries();
    }
  }, [isAuthenticated, fetchEntries]);

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  // Calcular estatísticas
  const emotionStats = entries.reduce((acc, entry) => {
    acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const averageIntensity = entries.length > 0
    ? (entries.reduce((sum, entry) => sum + entry.intensity, 0) / entries.length).toFixed(1)
    : 0;

  const mostFrequentEmotion = Object.entries(emotionStats).sort(([, a], [, b]) => b - a)[0];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={() => setLocation("/diario")}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-serif font-medium text-primary">Meu Perfil</h1>
              <p className="text-muted-foreground">Gerencie suas informações e dados</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Informações do Usuário */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent" />
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    {user?.avatar && (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-24 h-24 rounded-full border-4 border-primary"
                      />
                    )}
                    <div className="flex-1">
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">Nome</p>
                        <p className="text-xl font-semibold text-foreground">{user?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-lg text-foreground">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estatísticas */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Suas Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total de Entradas</p>
                      <p className="text-3xl font-bold text-primary">{entries.length}</p>
                    </div>
                    <div className="p-4 bg-accent/5 rounded-lg">
                      <p className="text-sm text-muted-foreground">Intensidade Média</p>
                      <p className="text-3xl font-bold text-accent">{averageIntensity}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Emoção Frequente</p>
                      <p className="text-2xl font-bold text-purple-700 capitalize">
                        {mostFrequentEmotion?.[0] || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Distribuição de Emoções */}
                  {Object.keys(emotionStats).length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="font-semibold mb-4">Distribuição de Emoções</h3>
                      <div className="space-y-3">
                        {Object.entries(emotionStats)
                          .sort(([, a], [, b]) => b - a)
                          .map(([emotion, count]) => (
                            <div key={emotion} className="flex items-center gap-3">
                              <span className="capitalize font-medium w-24">{emotion}</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-primary rounded-full h-2 transition-all"
                                  style={{
                                    width: `${(count / entries.length) * 100}%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm font-semibold w-8 text-right">{count}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Histórico Recente */}
              {entries.length > 0 && (
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-accent" />
                      Entradas Recentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {entries.slice(0, 5).map((entry) => (
                        <div key={entry.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="capitalize font-semibold text-primary">{entry.emotion}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(entry.createdAt).toLocaleDateString("pt-BR")}
                              </span>
                            </div>
                            <p className="text-sm text-foreground line-clamp-2">{entry.notes}</p>
                          </div>
                          <div className="ml-4 text-right">
                            <p className="text-sm font-semibold text-primary">{entry.intensity}/10</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Coluna Lateral */}
            <div className="space-y-6">
              {/* Ações */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => setLocation("/diario")}
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6"
                  >
                    Voltar ao Diário
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full rounded-full py-6"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair da Conta
                  </Button>
                </CardContent>
              </Card>

              {/* Informações de Privacidade */}
              <Card className="border-none shadow-lg bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-base">Privacidade</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-foreground/80 space-y-2">
                  <p>✓ Seus dados são armazenados com segurança</p>
                  <p>✓ Apenas você pode acessar suas entradas</p>
                  <p>✓ Você pode deletar sua conta a qualquer momento</p>
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
