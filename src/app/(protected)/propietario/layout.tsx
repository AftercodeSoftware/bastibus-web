import PageContainer from "@/components/PageContainer";
import BottomBar from "@/components/pages/propietario/BottomBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bastibus - Panel",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-[#F9F8F8]">
      <PageContainer
        wrapper="main"
        className="relative h-96 min-h-[90vh] text-gris-900 pt-8"
      >
        {children}
      </PageContainer>
      <BottomBar />
    </div>
  );
}
