import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Mail, Github, X } from "lucide-react";
import { toast } from "sonner";

declare global {
  interface Window {
    google: any;
    microsoftTeams: any;
  }
}

export default function Login() {
  const { loginWithGoogle, loginWithMicrosoft, loginWithGitHub, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Redirecionar se já autenticado
  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/diario");
    }
  }, [isAuthenticated, setLocation]);

  const handleClose = () => {
    setLocation("/diario");
  };

  // Carregar Google Sign-In
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID", // Substituir com seu Client ID
          callback: handleGoogleLogin,
        });
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  async function handleGoogleLogin(response: any) {
    try {
      setIsLoading(true);
      const decoded = decodeJwt(response.credential);
      await loginWithGoogle(decoded);
      toast.success("Login com Google realizado com sucesso!");
      setLocation("/diario/meu");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Erro ao fazer login com Google");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleMicrosoftLogin() {
    try {
      setIsLoading(true);
      // Simular login Microsoft (em produção, usar MSAL)
      const mockUser = {
        id: "microsoft_" + Date.now(),
        email: "user@microsoft.com",
        displayName: "User Name",
        userPrincipalName: "user@microsoft.com",
      };
      await loginWithMicrosoft(mockUser);
      toast.success("Login com Microsoft realizado com sucesso!");
      setLocation("/diario/meu");
    } catch (error) {
      console.error("Microsoft login error:", error);
      toast.error("Erro ao fazer login com Microsoft");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGitHubLogin() {
    try {
      setIsLoading(true);
      // Simular login GitHub (em produção, usar OAuth)
      const mockUser = {
        id: Math.floor(Math.random() * 1000000),
        email: "user@github.com",
        login: "username",
        avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
      };
      await loginWithGitHub(mockUser);
      toast.success("Login com GitHub realizado com sucesso!");
      setLocation("/diario/meu");
    } catch (error) {
      console.error("GitHub login error:", error);
      toast.error("Erro ao fazer login com GitHub");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Bem-vindo</h1>
          <p className="text-muted-foreground">Faça login para acessar seu Diário de Emoções</p>
        </div>

        {/* Login Card */}
        <Card className="border-none shadow-lg relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4 rounded-full z-10"
            onClick={handleClose}
          >
            <X className="w-5 h-5" />
          </Button>
          <CardHeader>
            <CardTitle>Escolha uma forma de login</CardTitle>
            <CardDescription>Seus dados serão armazenados com segurança</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Login */}
            <Button
              onClick={() => {
                const button = document.querySelector("[data-google-button]");
                if (button) {
                  (button as HTMLElement).click();
                }
              }}
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-full py-6 font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>

            {/* Google Sign-In Button (Hidden) */}
            <div data-google-button className="hidden">
              <div
                id="g_id_onload"
                data-client_id="YOUR_GOOGLE_CLIENT_ID"
                data-callback="handleGoogleLogin"
              ></div>
              <div className="g_id_signin" data-type="standard"></div>
            </div>

            {/* Microsoft Login */}
            <Button
              onClick={handleMicrosoftLogin}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6 font-medium flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Microsoft
            </Button>

            {/* GitHub Login */}
            <Button
              onClick={handleGitHubLogin}
              disabled={isLoading}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white rounded-full py-6 font-medium flex items-center justify-center gap-2"
            >
              <Github className="w-5 h-5" />
              GitHub
            </Button>

            {/* Info */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-muted-foreground text-center">
                Ao fazer login, você concorda com nossos Termos de Serviço e Política de Privacidade.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Precisa de ajuda?{" "}
            <a href="https://wa.me/5521982525626" className="text-primary hover:underline font-medium">
              Fale conosco no WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Função auxiliar para decodificar JWT (Google)
function decodeJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}
