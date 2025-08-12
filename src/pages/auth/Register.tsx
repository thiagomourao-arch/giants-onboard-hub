import SEO from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/AuthProvider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) });

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { register: signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await signup(data.name, data.email, data.password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <SEO title="Giants OnBoard — Cadastro" description="Crie sua conta para gerenciar reservas e eventos." />
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm" style={{ boxShadow: "var(--shadow-elevate)" }}>
        <h1 className="text-2xl font-semibold tracking-tight mb-1">Criar conta</h1>
        <p className="text-sm text-muted-foreground mb-6">Bem-vindo(a) a bordo!</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm">Nome</label>
            <Input {...register("name")} placeholder="Seu nome" aria-invalid={!!errors.name} />
            {errors.name && <p className="text-sm text-destructive mt-1">Informe seu nome</p>}
          </div>
          <div>
            <label className="text-sm">E-mail</label>
            <Input {...register("email")} type="email" placeholder="voce@exemplo.com" aria-invalid={!!errors.email} />
            {errors.email && <p className="text-sm text-destructive mt-1">E-mail inválido</p>}
          </div>
          <div>
            <label className="text-sm">Senha</label>
            <Input {...register("password")} type="password" placeholder="Crie uma senha" aria-invalid={!!errors.password} />
            {errors.password && <p className="text-sm text-destructive mt-1">Mínimo 6 caracteres</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Criando..." : "Criar conta"}</Button>
        </form>

        <div className="mt-4 text-sm">
          Já possui conta? <Link to="/" className="hover:underline">Entrar</Link>
        </div>
      </div>
    </div>
  );
}
