import Container from "@/components/Container";
// import Input from "@/components/Input";
// import SignInForm from "@/components/SignInForm";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Link href="/login" className="text-gris-950 text-4xl">
        Login
      </Link>
    </Container>
  );
}
