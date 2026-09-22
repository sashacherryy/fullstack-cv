import { Provider } from "@/components/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>header Admin</header>
      <>{children}</>
      <footer>FOOTER</footer>
    </>
  );
}
