"use client";
import { useUser } from "@/context/UserContext";

export default function Admin() {
  const { user } = useUser();
  console.log(user);

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3"></div>
  );
}
