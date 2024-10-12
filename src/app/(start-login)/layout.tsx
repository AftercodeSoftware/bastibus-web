import Container from "@/components/Container";
import GoBackButton from "@/components/pages/start-login/GoBackButton";
import LoginCard from "@/components/pages/start-login/LoginCard";
import LoginForm from "@/components/pages/start-login/LoginForm";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="items-stretch h-full">
      <div className="h-1/4 flex items-center justify-center">
        <Image src="/logo.png" alt="logo" width={160} height={160} />
      </div>
      <Container className="flex flex-col items-center">{children}</Container>
    </div>
  );
}

export default Layout;
