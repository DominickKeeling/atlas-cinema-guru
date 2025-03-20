import "@/app/global.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`antialiased  bg-[#00003c] text-white`}>
        <SessionProvider>
          <Header />
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
