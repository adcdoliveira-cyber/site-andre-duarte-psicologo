import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: (googleUser: any) => Promise<void>;
  loginWithMicrosoft: (microsoftUser: any) => Promise<void>;
  loginWithGitHub: (githubUser: any) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar token e usuário do localStorage ao iniciar
  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    if (savedToken) {
      setToken(savedToken);
      checkAuth(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Verificar autenticação
  async function checkAuth(authToken?: string) {
    try {
      const tokenToUse = authToken || token;
      if (!tokenToUse) {
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${tokenToUse}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Token inválido
        localStorage.removeItem("auth_token");
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Login com Google
  async function loginWithGoogle(googleUser: any) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: googleUser.sub,
          email: googleUser.email,
          name: googleUser.name,
          picture: googleUser.picture,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("auth_token", data.token);
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // Login com Microsoft
  async function loginWithMicrosoft(microsoftUser: any) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/microsoft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: microsoftUser.id,
          email: microsoftUser.userPrincipalName,
          displayName: microsoftUser.displayName,
          picture: microsoftUser.photo,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("auth_token", data.token);
    } catch (error) {
      console.error("Microsoft login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // Login com GitHub
  async function loginWithGitHub(githubUser: any) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: githubUser.id,
          email: githubUser.email,
          login: githubUser.login,
          avatar_url: githubUser.avatar_url,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("auth_token", data.token);
    } catch (error) {
      console.error("GitHub login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  // Logout
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
  }

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    loginWithGoogle,
    loginWithMicrosoft,
    loginWithGitHub,
    logout,
    checkAuth: () => checkAuth(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
