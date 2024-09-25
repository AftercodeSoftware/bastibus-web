import PageContainer from "@/components/PageContainer";
import BottomBar from "@/components/pages/propietario/BottomBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-[#F9F8F8]">
      <PageContainer
        wrapper="main"
        className="relative h-96 min-h-screen text-gris-900 pt-8"
      >
        {children}
      </PageContainer>
      <BottomBar />
    </div>
  );
}
