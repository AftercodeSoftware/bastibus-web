"use client";

import { Usuario } from "@/types/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextProps {
  user: Usuario | null;
  loading: boolean; // Add loading state to the context
  // setUser: (user: Usuario | Propietario | null) => void;
  login: (email: string, password: string) => Promise<Usuario["rol"]>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_IP}/auth/status`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
          // router.replace("/");
        }
      } catch (error) {
        console.log("error choto:", error);
        setUser(null);
        // router.replace("/");
      } finally {
        setLoading(false);
      }
    };

    // const checkUserSessionMock = async () => {
    //   try {
    //     const data: { user: Usuario } = {
    //       user: {
    //         id: "1",
    //         dni: "441402249",
    //         nombre: "Gabriel",
    //         apellido: "Penes Diez",
    //         manzana: "7",
    //         lote: "16",
    //         email: "gabsplat@gmail.com",
    //         phone: "261510",
    //         rol: "propietario",
    //         created_at: "2021-09-29T00:00:00.000Z",
    //         auth_id: "1",
    //       },
    //     };

    //     if (data.user) {
    //       setUser(data.user);
    //     } else {
    //       setUser(null);
    //       router.replace("/");
    //     }
    //   } catch (error) {
    //     setUser(null);
    //     router.replace("/");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // checkUserSessionMock();
    checkUserSession();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<Usuario["rol"]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_IP}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log("Data: ", data);

    if (data.error) {
      throw new Error(data.error);
    }
    setUser(data);
    return data;
  };

  return (
    <UserContext.Provider value={{ user, login, loading }}>
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
