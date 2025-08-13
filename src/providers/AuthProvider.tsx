import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  provider?: "password" | "google" | "microsoft";
};

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithProvider: (provider: "google" | "microsoft") => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "go_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const persist = (u: AuthUser | null) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    if (!email || !password) {
      setLoading(false);
      toast({ title: "Erro", description: "Informe e-mail e senha.", variant: "destructive" });
      throw new Error("Invalid");
    }
    const u: AuthUser = { id: crypto.randomUUID(), email, name: email.split("@")[0], provider: "password" };
    setUser(u);
    persist(u);
    setLoading(false);
    toast({ title: "Bem-vindo(a)!", description: "Login realizado com sucesso." });
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (!name || !email || !password) {
      setLoading(false);
      toast({ title: "Erro", description: "Preencha todos os campos.", variant: "destructive" });
      throw new Error("Invalid");
    }
    const u: AuthUser = { id: crypto.randomUUID(), email, name, provider: "password" };
    setUser(u);
    persist(u);
    setLoading(false);
    toast({ title: "Cadastro concluído", description: "Conta criada e sessão iniciada." });
  };

  const loginWithProvider = async (provider: "google" | "microsoft") => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const u: AuthUser = {
      id: crypto.randomUUID(),
      email: `${provider}@mock.com`,
      name: provider === "google" ? "Usuário Google" : "Usuário Microsoft",
      provider,
    };
    setUser(u);
    persist(u);
    setLoading(false);
    toast({ title: "Login via SSO", description: `Conectado com ${provider}.` });
  };

  const recoverPassword = async (email: string) => {
    await new Promise((r) => setTimeout(r, 500));
    if (!email) {
      toast({ title: "Erro", description: "Informe um e-mail válido.", variant: "destructive" });
      throw new Error("Invalid");
    }
    toast({ title: "Enviado", description: "Se houver conta associada, enviaremos instruções." });
  };

  const updateProfile = async (data: Partial<AuthUser>) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    if (!user) {
      setLoading(false);
      toast({ title: "Erro", description: "Usuário não encontrado.", variant: "destructive" });
      throw new Error("No user");
    }
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    persist(updatedUser);
    setLoading(false);
    toast({ title: "Perfil atualizado", description: "Suas informações foram salvas com sucesso." });
  };

  const logout = () => {
    setUser(null);
    persist(null);
    toast({ title: "Sessão encerrada", description: "Volte em breve." });
  };

  const value = useMemo(() => ({ user, loading, login, register, loginWithProvider, recoverPassword, updateProfile, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
