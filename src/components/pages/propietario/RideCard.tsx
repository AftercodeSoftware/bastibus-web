import { Bus, BusFront } from "lucide-react";

export default function RideCard() {
  return (
    <div className="flex rounded-xl overflow-hidden w-full bg-white min-h-40 shadow-sm border">
      <div className="relative justify-between bg-[#A0334E] w-8 text-white">
        {/* ! |v REFACTOR */}
        <span className="absolute transform left-1/2 -translate-x-1/2 origin-center -rotate-90 top-10 text-sm font-semibold">
          REDUCIDO
        </span>{" "}
        {/* TIPO DE MICRO */}
        <BusFront
          size={18}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        />
      </div>
      <div className="flex-1 p-3 flex flex-col justify-between">
        {/* IDA + UNCUYO? */}
        <div>
          <div className="flex justify-between items-center w-full">
            <span className="text-md font-semibold">
              Barrio - Plaza Independencia
            </span>
            {/* <div className="py-1 px-2 h-fit rounded-full bg-[#3362A0] text-xs text-white font-medium">
              UNCUYO
            </div> */}
          </div>
          {/* HORARIOS IDA */}
          <div className="flex gap-3 mt-1 font-medium px-4">
            <span className="text-gray-500">14:25</span>
            <div className="flex-1 border-gris-400 border-t border-dashed h-0 self-center"></div>
            <span className="text-gray-500">14:50</span>
          </div>{" "}
        </div>
        {/* VUELTA */}
        <div>
          <div className="w-full">
            <span className="text-md font-semibold">
              Barrio - Plaza Independencia
            </span>
          </div>
          <div className="flex gap-3 mt-1 font-medium px-4">
            <span className="text-gray-500">14:25</span>
            <div className="flex-1 border-gris-400 border-t border-dashed h-0 self-center"></div>
            <span className="text-gray-500">14:50</span>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
