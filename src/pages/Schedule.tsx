import SEO from "@/components/common/SEO";
import EventCard from "@/components/common/EventCard";
import { events } from "@/data/events";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Schedule() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [audience, setAudience] = useState<string>("Todos");
  const [category, setCategory] = useState<string>("Todas");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const dOk = date ? format(new Date(e.datetime), "yyyy-MM-dd") === format(date, "yyyy-MM-dd") : true;
      const aOk = audience === "Todos" ? true : e.audience === audience;
      const cOk = category === "Todas" ? true : e.category === category;
      const qOk = query ? e.title.toLowerCase().includes(query.toLowerCase()) : true;
      return dOk && aOk && cOk && qOk;
    });
  }, [date, audience, category, query]);

  return (
    <div className="space-y-6">
      <SEO title="Giants OnBoard — Programação" description="Explore todas as atividades a bordo e filtre por data e categoria." />
      <h1 className="text-3xl font-semibold tracking-tight">Programação</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 space-y-4">
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          <div className="space-y-2">
            <label className="text-sm">Público</label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger>
                <SelectValue placeholder="Público" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Adulto">Adulto</SelectItem>
                <SelectItem value="Família">Família</SelectItem>
                <SelectItem value="Crianças">Crianças</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm">Categoria</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas">Todas</SelectItem>
                <SelectItem value="Show">Show</SelectItem>
                <SelectItem value="Palestra">Palestra</SelectItem>
                <SelectItem value="Esporte">Esporte</SelectItem>
                <SelectItem value="Gastronomia">Gastronomia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm">Buscar</label>
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Título da atividade" />
          </div>
        </aside>

        <section className="lg:col-span-3 space-y-4">
          <Tabs defaultValue="grid">
            <TabsList>
              <TabsTrigger value="grid">Grade</TabsTrigger>
              <TabsTrigger value="list">Lista</TabsTrigger>
            </TabsList>
            <TabsContent value="grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((e) => (
                <EventCard
                  key={e.id}
                  image={e.image}
                  title={e.title}
                  time={`${format(new Date(e.datetime), "dd 'de' MMM, HH:mm", { locale: ptBR })}`}
                  audience={e.audience}
                  onClick={() => (window.location.href = `/programacao/${e.id}`)}
                />
              ))}
            </TabsContent>
            <TabsContent value="list" className="space-y-3">
              {filtered.map((e) => (
                <div key={e.id} className="rounded-md border p-3 flex items-center gap-4 hover:bg-muted/50 cursor-pointer" onClick={() => (window.location.href = `/programacao/${e.id}`)}>
                  <img src={e.image} alt={e.title} loading="lazy" className="h-20 w-28 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{e.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(e.datetime), "dd 'de' MMM, HH:mm", { locale: ptBR })} • {e.audience} • {e.category}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
