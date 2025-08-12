import SEO from "@/components/common/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";

const data = [
  { cat: "Reservas", q: "Como visualizar minhas reservas?", a: "Acesse Minhas Reservas no menu superior." },
  { cat: "Reservas", q: "Posso alterar passageiros?", a: "Entre em contato pelo formulário informando o número da reserva." },
  { cat: "Programação", q: "A programação muda?", a: "Eventos podem sofrer alterações sem aviso prévio." },
  { cat: "Suporte", q: "Como falo com suporte?", a: "Pelo formulário de contato ou FAQ." },
];

export default function FAQ() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => data.filter((i) => (i.q + i.a + i.cat).toLowerCase().includes(query.toLowerCase())), [query]);
  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, typeof data>>( (acc, item) => {
      acc[item.cat] = acc[item.cat] ? [...acc[item.cat], item] : [item];
      return acc;
    }, {} as any);
  }, [filtered]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.map((d) => ({ "@type": "Question", name: d.q, acceptedAnswer: { "@type": "Answer", text: d.a } })),
  };

  return (
    <div className="space-y-6">
      <SEO title="Giants OnBoard — FAQ" description="Perguntas frequentes sobre reservas, programação e suporte." />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <h1 className="text-3xl font-semibold tracking-tight">FAQ</h1>

      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar respostas..." />

      {Object.entries(grouped).map(([cat, items]) => (
        <section key={cat} className="space-y-2">
          <h2 className="text-lg font-semibold">{cat}</h2>
          <Accordion type="single" collapsible className="w-full">
            {items.map((it, idx) => (
              <AccordionItem key={idx} value={`${cat}-${idx}`}>
                <AccordionTrigger>{it.q}</AccordionTrigger>
                <AccordionContent>{it.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ))}
    </div>
  );
}
