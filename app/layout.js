import { Poppins } from "next/font/google";
import "@/components/ui/globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={`${poppins.className} w-full h-full bg-bg text-white`}>
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
