import { Propietario, Usuario } from "@/types/types";
import React, { createContext, ReactNode, useContext } from "react";

interface UserContextProps {
  user: Usuario | Propietario | null;
  setUser: (user: Usuario | Propietario | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  initialUser: Usuario | Propietario | null;
}

export const UserProvider = ({ initialUser, children }: UserProviderProps) => {
  const [user, setUser] = React.useState<Usuario | Propietario | null>(
    initialUser
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};
