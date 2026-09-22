import { Provider } from "@/components/provider";
import Link from "next/dist/client/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <div>Вишневський Олександр</div>

        <div>
          <Link href="/about">Про мене</Link>

          <Link href="/skills">Скіли</Link>

          <Link href="/projects">Проекти</Link>

          <Link href="/contact">Контакти</Link>
        </div>

        <div></div>
      </header>
      <>{children}</>
      <footer>FOOTER</footer>
    </>
  );
}
