import SEO from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/AuthProvider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { login, loginWithProvider } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await login(data.email, data.password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid place-items-center relative overflow-hidden">
      <SEO title="Giants OnBoard — Entrar" description="Acesse o portal para ver reservas, programação e suporte." />
      {/* signature moment: animated gradient aura */}
      <div className="pointer-events-none absolute -top-40 right-10 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: "var(--gradient-gold)" }} />
      <div className="pointer-events-none absolute -bottom-40 left-10 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: "var(--gradient-primary)" }} />

      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm" style={{ boxShadow: "var(--shadow-elevate)" }}>
        <h1 className="text-2xl font-semibold tracking-tight mb-1">Giants OnBoard</h1>
        <p className="text-sm text-muted-foreground mb-6">Acesse sua conta para continuar</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm">E-mail</label>
            <Input {...register("email")} type="email" placeholder="voce@exemplo.com" aria-invalid={!!errors.email} />
            {errors.email && <p className="text-sm text-destructive mt-1">E-mail inválido</p>}
          </div>
          <div>
            <label className="text-sm">Senha</label>
            <Input {...register("password")} type="password" placeholder="Sua senha" aria-invalid={!!errors.password} />
            {errors.password && <p className="text-sm text-destructive mt-1">Mínimo 6 caracteres</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Entrando..." : "Entrar"}</Button>
        </form>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => loginWithProvider("google").then(() => navigate("/dashboard"))}>Entrar com Google</Button>
          <Button variant="secondary" onClick={() => loginWithProvider("microsoft").then(() => navigate("/dashboard"))}>Entrar com Microsoft</Button>
        </div>

        <div className="mt-4 text-sm flex items-center justify-between">
          <Link to="/recuperacao" className="hover:underline">Esqueci minha senha</Link>
          <span>
            Não tem conta? <Link to="/registro" className="hover:underline">Cadastrar</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
