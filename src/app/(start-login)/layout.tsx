import Container from "@/components/Container";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="items-stretch h-full">
      <div className="h-1/4 flex items-center justify-center">
        <img src="/logo.png" alt="logo" width={160} height={160} />
      </div>
      <Container className="flex flex-col items-center">{children}</Container>
    </div>
  );
}

export default Layout;
