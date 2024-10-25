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

export interface BasicUser {
  id: string;
  dni: string;
  name: string;
  type: "frecuente" | "eventual";
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
  id: number;
  llegadabarrio: string; // Time in HH:MM:SS format
  llegadadestino: string; // Time in HH:MM:SS format
  observacion: string | null; // Nullable field
  salidabarrio: string; // Time in HH:MM:SS format
  salidadestino: string; // Time in HH:MM:SS format
  created_at: string; // Date in ISO format
  tipo: BusType;
}

export interface UserTrip {
  id: number;
  recorrido_id: number;
  recorrido: {
    tipo: BusType;
  };
  chofer_id: number;
  idavuelta: number;
  propietario_id: number;
  autorizacion_id: number;
  autorizacion: {
    tipo: "frecuente" | "eventual";
    visita: {
      apellido: string;
      nombre: string;
    };
  };
  coordenadasubida: string;
  horasubida: string;
  coordenadabajada: string;
  horabajada: string;
  created_at: string; // Date in ISO format
  estado: string;
}

export interface Authorization {
  id: number;
  propietario_id: number;
  visita_id: number;
  tipo: string;
  dia: string; // Date in "YYYY-MM-DD" format
  desde: string; // Time or datetime, depending on your data structure
  hasta: string; // Time or datetime, depending on your data structure
  usos: number;
  created_at: string; // Date in ISO format
  visita: {
    nombre: string;
    apellido: string;
    created_at: string;
    dni: string;
    id: number;
  };
}
