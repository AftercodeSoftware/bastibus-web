"use client";

import { motion } from "framer-motion";
import { Clock, DoorOpen, House, User, Watch } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface RouteLink {
  text: string;
  route: string;
  icon: React.ElementType;
  active?: boolean;
}

const links: RouteLink[] = [
  { text: "Horarios", route: "/propietario/horarios", icon: Watch },
  { text: "Historial", route: "/propietario/historial", icon: Clock },
  { text: "Inicio", route: "/propietario", icon: House },
  { text: "Autorizar", route: "/propietario/autorizar", icon: DoorOpen },
  { text: "Perfil", route: "/propietario/perfil", icon: User },
];

export default function BottomBar() {
  const path = usePathname();
  return (
    <nav className="block absolute bottom-0 left-0 w-full bg-gris-50 rounded-tl-2xl rounded-tr-2xl h-20 border-t-2 border-verde-400">
      <ul className="h-full flex justify-between items-center px-4 md:px-20">
        {links.map((link) => (
          <NavItem
            key={link.route}
            text={link.text}
            route={link.route}
            icon={link.icon}
            active={path === link.route}
          />
        ))}
      </ul>
    </nav>
  );
}

function NavItem({ text, route, icon: Icon, active = false }: RouteLink) {
  return (
    <li>
      <Link
        href={route}
        className={`cursor-pointer w-16 bg-slate-600  ${
          active ? "text-verde-800 font-bold" : "text-gris-800 font-medium"
        }`}
      >
        <motion.div
          className="flex flex-col items-center "
          whileTap={{ scale: 0.8 }}
        >
          <Icon size={24} />
          <span className="text-sm">{text}</span>
        </motion.div>
      </Link>
    </li>
  );
}
