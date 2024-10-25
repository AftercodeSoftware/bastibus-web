/* eslint-disable @next/next/no-img-element */
import Container from "@/components/Container";
import LoginCard from "@/components/pages/start-login/LoginCard";
import LoginForm from "@/components/pages/start-login/LoginForm";
import Link from "next/link";

const Home = () => {
  return (
    <div className="items-stretch h-full">
      <div className="h-1/3 my-20 flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Logo La Bastilla"
          className="w-[40%] sm:w-44"
        />
      </div>
      <Container className="flex flex-col items-center">
        <LoginCard>
          <div className="mb-8">
            <h1 className="text-center text-2xl text-gris-900 font-semibold">
              Bienvenido
            </h1>
            <span className="block text-center text-gris-600 text-sm mt-1">
              Completá tus datos y empezá a operar.
            </span>
          </div>
          <LoginForm />
        </LoginCard>
        <span className="block my-4 text-gris-400 text-center">
          Si todavía no tenes usuario{" "}
          <Link
            href="/sign-up"
            className="text-verde-600 font-semibold cursor-pointer"
          >
            solicitalo acá
          </Link>
          .
        </span>
      </Container>
    </div>
  );
};

export default Home;
