import SEO from "@/components/common/SEO";
import { events } from "@/data/events";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function ActivityDetails() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);

  if (!event) return <div>Atividade não encontrada.</div>;

  return (
    <div className="space-y-6">
      <SEO title={`Giants OnBoard — ${event.title}`} description={event.description.slice(0, 150)} />
      <h1 className="text-3xl font-semibold tracking-tight">{event.title}</h1>
      <article className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <img src={event.image} alt={`Imagem do evento ${event.title}`} className="w-full rounded-md object-cover" />
        </div>
        <aside className="space-y-3">
          <div className="rounded-md border p-4">
            <div className="text-sm text-muted-foreground">Horário</div>
            <div className="font-medium">{format(new Date(event.datetime), "dd 'de' MMM, HH:mm", { locale: ptBR })}</div>
          </div>
          <div className="rounded-md border p-4">
            <div className="text-sm text-muted-foreground">Duração</div>
            <div className="font-medium">{event.durationMinutes} min</div>
          </div>
          <div className="rounded-md border p-4">
            <div className="text-sm text-muted-foreground">Público-alvo</div>
            <div className="font-medium">{event.audience}</div>
          </div>
          <div className="rounded-md border p-4">
            <div className="text-sm text-muted-foreground">Categoria</div>
            <div className="font-medium">{event.category}</div>
          </div>
        </aside>
      </article>
      <section className="text-foreground leading-relaxed">
        <p>{event.description}</p>
      </section>
    </div>
  );
}
