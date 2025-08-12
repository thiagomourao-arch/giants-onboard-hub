import SEO from "@/components/common/SEO";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "Mensagem muito curta"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await new Promise((r) => setTimeout(r, 700));
      toast({ title: "Mensagem enviada", description: "Responderemos em breve." });
      reset();
    } catch (e) {
      toast({ title: "Erro ao enviar", description: "Tente novamente mais tarde.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <SEO title="Giants OnBoard — Contato" description="Fale com nossa equipe de suporte." />
      <h1 className="text-3xl font-semibold tracking-tight">Contato</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm">Nome</label>
          <Input {...register("name")} placeholder="Seu nome" aria-invalid={!!errors.name} />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm">E-mail</label>
          <Input {...register("email")} type="email" placeholder="voce@exemplo.com" aria-invalid={!!errors.email} />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm">Telefone (opcional)</label>
          <Input {...register("phone")} placeholder="(00) 00000-0000" />
        </div>
        <div>
          <label className="text-sm">Mensagem</label>
          <Textarea {...register("message")} rows={5} placeholder="Como podemos ajudar?" aria-invalid={!!errors.message} />
          {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar mensagem"}
        </Button>
      </form>
    </div>
  );
}
