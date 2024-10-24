import { BasicUser, BusRide, UserTrip } from "@/types/types";
import { create } from "zustand";

type State = {
  recorridos: BusRide[];
  ultimosViajes: UserTrip[];
  autorizados: BasicUser[];
};

type Action = {
  addAutorizado: (autorizado: BasicUser) => void;
  removeAutorizado: (id: string) => void;
  updateRecorridos: (recorridos: BusRide[]) => void;
  updateUltimosViajes: (viajes: UserTrip[]) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useGlobalStore = create<State & Action>((set) => ({
  recorridos: [],
  ultimosViajes: [],
  autorizados: [],
  addAutorizado: (autorizado) =>
    set((state) => ({ autorizados: [...state.autorizados, autorizado] })),
  removeAutorizado: (id) =>
    set((state) => ({
      autorizados: state.autorizados.filter(
        (autorizado) => autorizado.id !== id
      ),
    })),
  updateRecorridos: (recorridos) => set({ recorridos }),
  updateUltimosViajes: (viajes) => set({ ultimosViajes: viajes }),
}));
