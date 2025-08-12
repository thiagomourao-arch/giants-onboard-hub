export type ReservationStatus = "Confirmada" | "Pendente" | "Cancelada";

export interface Reservation {
  id: string;
  cabinType: "Suíte" | "Varanda" | "Interior";
  passengers: number;
  cabins: number;
  status: ReservationStatus;
}

export const reservations: Reservation[] = [
  { id: "r1", cabinType: "Suíte", passengers: 2, cabins: 1, status: "Confirmada" },
  { id: "r2", cabinType: "Varanda", passengers: 4, cabins: 2, status: "Confirmada" },
  { id: "r3", cabinType: "Interior", passengers: 1, cabins: 1, status: "Pendente" },
];
