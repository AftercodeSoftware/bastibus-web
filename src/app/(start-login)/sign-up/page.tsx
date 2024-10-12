import GoBackButton from "@/components/pages/start-login/GoBackButton";
import LoginCard from "@/components/pages/start-login/LoginCard";
import SignUpForm from "@/components/pages/start-login/SignUpForm";
import React from "react";

export default function Page() {
  return (
    <>
      <LoginCard>
        <GoBackButton />
        <div className="mb-8">
          <h1 className="text-center mt-3 text-3xl text-verde-900 font-medium">
            Solicitud de registro
          </h1>
          <span className="block text-center text-gris-800 text-sm mt-1">
            Completá tus datos y empezá a operar.
          </span>
        </div>
        <SignUpForm />
      </LoginCard>
      <span className="block mt-4 text-gris-400 text-center">
        Tu solicitud será procesada por la administración.
      </span>
      <span className="block mt-3 mb-8 text-gris-400 text-center md:max-w-[25%]">
        Si es aprobada,{" "}
        <span className="font-bold">
          recibirás tus credenciales en tu correo electrónico
        </span>{" "}
        para acceder al sistema.
      </span>
    </>
  );
}
