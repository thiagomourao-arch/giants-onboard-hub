import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReservationSummaryProps {
  totalCabins: number;
  totalPassengers: number;
  totalReservations: number;
}

export default function ReservationSummary({ totalCabins, totalPassengers, totalReservations }: ReservationSummaryProps) {
  return (
    <Card className="shadow-sm" style={{ boxShadow: "var(--shadow-elevate)" }}>
      <CardHeader>
        <CardTitle>Minhas Reservas</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-md border p-4">
          <div className="text-sm text-muted-foreground">Total de Cabines</div>
          <div className="text-2xl font-semibold">{totalCabins}</div>
        </div>
        <div className="rounded-md border p-4">
          <div className="text-sm text-muted-foreground">Total de Passageiros</div>
          <div className="text-2xl font-semibold">{totalPassengers}</div>
        </div>
        <div className="rounded-md border p-4">
          <div className="text-sm text-muted-foreground">Total de Reservas</div>
          <div className="text-2xl font-semibold">{totalReservations}</div>
        </div>
      </CardContent>
    </Card>
  );
}
