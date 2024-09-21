import Container from "@/components/Container";
import LoginCard from "@/components/pages/start-login/LoginCard";
import LoginForm from "@/components/pages/start-login/LoginForm";
import { Bus, Hand, HandHeart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="items-stretch h-full">
      <div className="h-1/3 flex items-center justify-center">
        <Image src="/logo.png" alt="logo" width={160} height={160} />
      </div>
      <Container className="flex flex-col items-center">
        <LoginCard>
          <div className="mb-8">
            <Bus
              className="mx-auto text-verde-500 animate-scale-in"
              size={64}
            />
            <h1 className="text-center text-4xl text-verde-900 font-bold">
              BastiBus
            </h1>
            <span className="block text-center text-gris-800 text-sm mt-1">
              Completá tus datos y empezá a operar.
            </span>
          </div>
          <LoginForm />
        </LoginCard>
        <span className="block my-4 text-gris-400 text-center">
          Si todavía no tenes usuario{" "}
          <Link
            href="/sign-up"
            className="text-verde-600 font-bold cursor-pointer"
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
