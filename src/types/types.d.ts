export interface UserData {
  rol: string;
  id: string;
}

export interface Usuario {
  id: string;
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  phone: string;
  created_at: string;
  auth_id: string;
  manzana?: string;
  lote?: string;
  rol: "propietario" | "administrador";
}

export interface JWTToken extends Usuario {
  rol: "propietario" | "administrador";
  "connect.sid": string;
}

export interface LoginResponse {
  message: string;
  rol: "propietario" | "administrador";
  userData: Usuario;
}

// Rides

export type BusType = "reducido" | "normal" | "express";

export interface BusRide {
  id: string;
  outboundTrip: {
    start: { place: string; date: string };
    end: { place: string; date: string };
  };
  returnTrip: {
    start: { place: string; date: string };
    end: { place: string; date: string };
  };
  type: BusType;
}

export interface UserTrip {
  id: string;
  trip: {
    start: { place: string; date: string };
    end: { place: string; date: string };
  };
  type: BusType;
}
