import event1 from "@/assets/events/event1.jpg";
import event2 from "@/assets/events/event2.jpg";
import event3 from "@/assets/events/event3.jpg";

export type Audience = "Adulto" | "Família" | "Crianças";
export type Category = "Show" | "Palestra" | "Esporte" | "Gastronomia";

export interface CruiseEvent {
  id: string;
  title: string;
  datetime: string; // ISO
  durationMinutes: number;
  audience: Audience;
  category: Category;
  image: string;
  description: string;
}

export const events: CruiseEvent[] = [
  {
    id: "e1",
    title: "Sunset Deck Party",
    datetime: new Date().toISOString(),
    durationMinutes: 120,
    audience: "Adulto",
    category: "Show",
    image: event1,
    description: "Celebre o pôr do sol com música ao vivo, drinks especiais e uma vista inesquecível do mar.",
  },
  {
    id: "e2",
    title: "Jazz & Cocktails",
    datetime: new Date(Date.now() + 86400000).toISOString(),
    durationMinutes: 90,
    audience: "Adulto",
    category: "Show",
    image: event2,
    description: "Uma noite sofisticada com um quarteto de jazz e coquetéis autorais em nosso lounge premium.",
  },
  {
    id: "e3",
    title: "Diversão na Piscina",
    datetime: new Date(Date.now() + 2 * 86400000).toISOString(),
    durationMinutes: 60,
    audience: "Família",
    category: "Esporte",
    image: event3,
    description: "Atividades aquáticas para todas as idades com nossa equipe de recreação.",
  },
];
