import SEO from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/AuthProvider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const schema = z.object({ email: z.string().email() });

type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const { recoverPassword } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await recoverPassword(data.email);
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <SEO title="Giants OnBoard — Recuperar senha" description="Recupere o acesso à sua conta." />
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm" style={{ boxShadow: "var(--shadow-elevate)" }}>
        <h1 className="text-2xl font-semibold tracking-tight mb-1">Recuperar senha</h1>
        <p className="text-sm text-muted-foreground mb-6">Informe seu e-mail para enviarmos instruções</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm">E-mail</label>
            <Input {...register("email")} type="email" placeholder="voce@exemplo.com" aria-invalid={!!errors.email} />
            {errors.email && <p className="text-sm text-destructive mt-1">E-mail inválido</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Enviando..." : "Enviar"}</Button>
        </form>

        <div className="mt-4 text-sm">
          <Link to="/" className="hover:underline">Voltar ao login</Link>
        </div>
      </div>
    </div>
  );
}
