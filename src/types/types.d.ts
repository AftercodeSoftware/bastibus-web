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
