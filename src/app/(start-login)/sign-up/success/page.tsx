import Button from "@/components/Button";
import GoBackButton from "@/components/pages/start-login/GoBackButton";
import LoginCard from "@/components/pages/start-login/LoginCard";
import SignUpForm from "@/components/pages/start-login/SignUpForm";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <LoginCard>
      <div className="mt-4 mb-10">
        <CircleCheck
          className="mx-auto text-verde-500 animate-scale-in"
          size={64}
        />
        <h1 className="text-center mt-3 text-3xl text-verde-900 font-semibold">
          Registro solicitado
        </h1>
        <span className="block text-center text-gris-800 text-sm mt-1">
          Te enviaremos un correo cuando todo funcione.
        </span>
      </div>
      <Link href="/">
        <Button type="button" className="w-full">
          Volver al inicio
        </Button>
      </Link>
    </LoginCard>
  );
}
