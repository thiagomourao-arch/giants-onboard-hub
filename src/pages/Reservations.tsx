import SEO from "@/components/common/SEO";
import { reservations } from "@/data/reservations";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Reservations() {
  const badgeCls = (status: string) => {
    if (status === "Confirmada") return "px-2 py-0.5 rounded text-xs bg-secondary/20 text-sidebar-primary";
    if (status === "Pendente") return "px-2 py-0.5 rounded text-xs bg-muted text-foreground";
    return "px-2 py-0.5 rounded text-xs bg-destructive/10 text-foreground border border-destructive/30";
  };

  return (
    <div className="space-y-6">
      <SEO title="Giants OnBoard — Minhas Reservas" description="Veja detalhes de todas as suas reservas ativas." />
      <h1 className="text-3xl font-semibold tracking-tight">Minhas Reservas</h1>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo de cabine</TableHead>
              <TableHead>Qtd. passageiros</TableHead>
              <TableHead>Qtd. cabines</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((r) => (
              <TableRow key={r.id} className="hover:bg-muted/50">
                <TableCell>{r.cabinType}</TableCell>
                <TableCell>{r.passengers}</TableCell>
                <TableCell>{r.cabins}</TableCell>
                <TableCell>
                  <span className={badgeCls(r.status)}>{r.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
