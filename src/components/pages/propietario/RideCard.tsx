import { BusRide, BusType } from "@/types/types";
import { Bus, BusFront, GitCommitHorizontal } from "lucide-react";

interface RideCardProps {
  ride: BusRide;
  uncuyo: boolean;
}

const cardColors = {
  reducido: "#A0334E",
  normal: "#3362A0",
  express: "#6524AA",
};

export default function RideCard({ ride, uncuyo }: RideCardProps) {
  return (
    <div
      style={{ borderColor: cardColors[ride.type] }}
      className="flex rounded-xl overflow-hidden w-full bg-white min-h-40 shadow-md border"
    >
      <div
        style={{
          backgroundColor: cardColors[ride.type],
        }}
        className={`relative justify-between w-8 text-white`}
      >
        {/* ! |v REFACTOR */}
        <span className="absolute transform left-1/2 -translate-x-1/2 origin-center -rotate-90 top-10 text-sm font-semibold">
          {ride.type.toUpperCase()}
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
              {ride.outboundTrip.start.place} - {ride.outboundTrip.end.place}
            </span>
          </div>
          {/* HORARIOS IDA */}
          <div className="flex gap-3 mt-1 font-medium px-4">
            <span className="text-gray-600">
              {ride.outboundTrip.start.date}
            </span>
            <div className="flex-1 border-gris-400 border-t border-dashed h-0 self-center"></div>
            <span className="text-gray-600">{ride.outboundTrip.end.date}</span>
          </div>{" "}
        </div>
        {uncuyo && (
          <div className="flex items-center my-4">
            <GitCommitHorizontal className="text-[#3362A0]/60 -mr-[2px]" />
            <div className="w-fit py-1 px-2 h-fit rounded-xl border-2 border-[#3362A0]/60 text-[#3362A0] text-xs font-bold">
              UNCUYO
            </div>
          </div>
        )}
        {/* VUELTA */}
        <div>
          <div className="w-full">
            <span className="text-md font-semibold">
              {ride.returnTrip.start.place} - {ride.returnTrip.end.place}
            </span>
          </div>
          <div className="flex gap-3 mt-1 font-medium px-4">
            <span className="text-gray-600">{ride.returnTrip.start.date}</span>
            <div className="flex-1 border-gris-400 border-t border-dashed h-0 self-center"></div>
            <span className="text-gray-600">{ride.returnTrip.end.date}</span>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
