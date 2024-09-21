"use client";

import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

function SignUpForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nombreRef = useRef<HTMLInputElement>(null);
  const apellidoRef = useRef<HTMLInputElement>(null);
  const dniRef = useRef<HTMLInputElement>(null);
  const correoRef = useRef<HTMLInputElement>(null);
  const celularRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    router.push("/sign-up/success");

    // const response = await fetch("/api/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify(body),
    // });

    // // Handle response if necessary
    // const { user } = await response.json();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="text-gris-600 w-full flex flex-col gap-6 mt-4"
    >
      <div className="flex gap-4">
        <div>
          <label htmlFor="email" className="font-medium">
            Manzana *
          </label>
          <Input
            ref={emailRef}
            type="manzana"
            name="email"
            placeholder="Manzana..."
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="font-medium">
            Casa *
          </label>
          <Input
            ref={passwordRef}
            type="text"
            name="casa"
            placeholder="Casa..."
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="font-medium">
          Nombre
        </label>
        <Input
          ref={nombreRef}
          type="text"
          name="nombre"
          placeholder="Nombre..."
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="font-medium">
          Apellido
        </label>
        <Input
          ref={apellidoRef}
          type="text"
          name="apellido"
          placeholder="Apellido..."
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="font-medium">
          DNI / Pasaporte
        </label>
        <Input
          ref={dniRef}
          type="text"
          name="dni"
          placeholder="DNI..."
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="font-medium">
          Correo electrónico
        </label>
        <Input
          ref={correoRef}
          type="text"
          name="email"
          placeholder="Correo..."
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="font-medium">
          Celular
        </label>
        <Input
          ref={celularRef}
          type="text"
          name="celular"
          placeholder="Celular..."
          required
        />
      </div>

      <Button className="w-full">Solicitar registro</Button>
    </form>
  );
}

export default SignUpForm;
