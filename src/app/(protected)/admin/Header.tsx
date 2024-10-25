import Link from "next/link";
import { PanelLeft } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation"; // Cambiado de useRouter a usePathname

export default function Header() {
  const pathname = usePathname(); // Ahora usamos usePathname para obtener el pathname actual
  const pathSegments = pathname.split("/").filter(Boolean);
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs"></SheetContent>
      </Sheet>

      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/");
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                  <Link href={href}>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </Link>
                </BreadcrumbLink>
                {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
