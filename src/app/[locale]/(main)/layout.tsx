import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer"

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
