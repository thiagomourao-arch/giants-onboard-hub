import SEO from "@/components/common/SEO";
import ReservationSummary from "@/components/common/ReservationSummary";
import EventCard from "@/components/common/EventCard";
import { Button } from "@/components/ui/button";
import { reservations } from "@/data/reservations";
import { events } from "@/data/events";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Dashboard() {
  const totalCabins = reservations.reduce((s, r) => s + r.cabins, 0);
  const totalPassengers = reservations.reduce((s, r) => s + r.passengers, 0);
  const totalReservations = reservations.length;

  const upcoming = events.slice(0, 3);

  return (
    <div className="space-y-6">
      <SEO title="Giants OnBoard — Dashboard" description="Acompanhe reservas e a programação do seu cruzeiro." />
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>

      <ReservationSummary totalCabins={totalCabins} totalPassengers={totalPassengers} totalReservations={totalReservations} />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Programação</h2>
          <Button asChild variant="secondary">
            <Link to="/programacao">Ver toda a programação</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcoming.map((e) => (
            <EventCard
              key={e.id}
              image={e.image}
              title={e.title}
              time={`${format(new Date(e.datetime), "dd 'de' MMM, HH:mm", { locale: ptBR })}`}
              audience={e.audience}
              onClick={() => (window.location.href = `/programacao/${e.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
