"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

export function DatePicker({
  date,
  setDate,
}: {
  date?: Date;
  setDate: (date: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full md:w-[280px] justify-start text-left font-inter h-14 font-normal rounded-full text-sm text-gris-fondo border-[3px] border-azul-primario",
            date && "font-semibold"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "d 'de' MMMM", { locale: es })
          ) : (
            <span>Elegí una fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50">
        <Calendar
          mode="single"
          selected={date}
          style={{ pointerEvents: "auto" }}
          lang="es"
          onDayClick={(day) => {
            if (day) {
              setDate(day);
            }
          }}
          locale={es}
          formatters={{
            formatWeekdayName: (day) =>
              format(day, "EEEEEE", { locale: es }).toUpperCase(),
            formatCaption: (date) => format(date, "LLLL yyyy", { locale: es }),
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
