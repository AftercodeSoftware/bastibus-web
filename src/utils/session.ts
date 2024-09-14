import session from "next-session";
import { promisifyStore } from "next-session/lib/compat";
import MemoryStore from "next-session";

// Configura el middleware de sesión
export const getSession = session({
  store: promisifyStore(MemoryStore()),
  cookie: {
    secure: process.env.NODE_ENV === "production",
  },
});
