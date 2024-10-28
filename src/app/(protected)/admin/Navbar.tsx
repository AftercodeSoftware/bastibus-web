"use client";

/* eslint-disable @next/next/no-img-element */
import { BusFront, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
interface RouteLink {
  text: string;
  route: string;
  icon: React.ElementType;
  active?: boolean;
}

export default function Navbar() {
  const path = usePathname();

  const router = useRouter();
  const { user } = useUser();

  const links: RouteLink[] = [
    { text: "Dashboard", route: "/admin/dashboard", icon: Home },
    { text: "Recorridos", route: "/admin/recorridos", icon: BusFront },
  ];

  const logout = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP}/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      console.error("Error al cerrar sesión");
      return;
    }
    router.replace("/");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {links.map((link) => (
          <NavItem
            key={link.route}
            text={link.text}
            route={link.route}
            icon={link.icon}
            active={path === link.route}
          />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          {/* <TooltipContent side="right">Settings</TooltipContent> */}
        {/* </Tooltip> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full bg-verde-800 flex items-center justify-center font-semibold text-3xl text-white"
            >
              {user?.nombre[0]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </aside>
  );
}
function NavItem({ text, route, icon: Icon, active = false }: RouteLink) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={route}
          className={
            active
              ? "group flex h-5 w-5 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              : "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          }
        >
          <Icon className="h-5 w-5" />

          <span className="sr-only">{text}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{text}</TooltipContent>
    </Tooltip>
  );
}
