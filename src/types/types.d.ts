export interface JWTToken {
  rol: string;
  email: string;
  id: string;
  iat: number;
  exp: number;
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
  rol: string;
}

export interface Propietario extends Usuario {
  manzana: string;
  lote: string;
}
