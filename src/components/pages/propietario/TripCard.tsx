import { useUser } from "@/context/UserContext";
import { BusType, UserTrip } from "@/types/types";
import { Bus, BusFront, Calendar, User } from "lucide-react";

interface TripCardProps {
  ride: UserTrip;
}

const cardColors = {
  reducido: "#A0334E",
  normal: "#3362A0",
  express: "#6524AA",
};

export default function TripCard({ ride }: TripCardProps) {
  const { user } = useUser();

  const tripDate = new Date(ride.created_at);
  const formattedTripDate = tripDate.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const personaViaje = ride.propietario_id
    ? user?.nombre + " " + user?.apellido
    : ride.autorizacion?.visita?.nombre +
      " " +
      ride.autorizacion?.visita?.apellido;

  return (
    <div className="flex rounded-xl overflow-hidden w-full bg-white shadow-md border">
      <div
        style={{ backgroundColor: cardColors[ride.recorrido.tipo] }}
        className={`w-3`}
      ></div>
      <div className="w-full pl-5 pr-6 py-4">
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <Calendar className="text-verde-800" size={18} />
            <span className="text-verde-700">{formattedTripDate}</span>
          </div>
          <div className="flex gap-1 items-center">
            <User className="text-verde-800" size={18} />
            <span className="text-verde-700">{personaViaje}</span>
          </div>
        </div>
        <div className="flex-1 flex gap-3 font-medium mt-4">
          <div className="flex flex-col max-w-32">
            <span className="text-md font-medium truncate">
              {ride.idavuelta === 1 ? "La Bastilla" : "Plaza Independencia"}
            </span>
            <span className="text-gray-600 text-sm">{ride.horasubida}</span>
          </div>
          <div className="flex-1 border-gris-400 border-t border-dashed h-0 self-center"></div>
          <div className="flex flex-col max-w-32">
            <span className="text-md font-medium truncate">
              {ride.idavuelta === 1 ? "Plaza Independencia" : "La Bastilla"}
            </span>
            <span className="text-gray-600 text-sm">{ride.horabajada}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
