import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EventCardProps {
  image: string;
  title: string;
  time: string;
  audience: string;
  onClick?: () => void;
}

export default function EventCard({ image, title, time, audience, onClick }: EventCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick} aria-label={`Abrir atividade ${title}`}>
      <img src={image} alt={`Evento: ${title}`} loading="lazy" className="h-40 w-full object-cover" />
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{time}</span>
          <span className="rounded bg-secondary/20 px-2 py-0.5">{audience}</span>
        </div>
      </CardContent>
    </Card>
  );
}
