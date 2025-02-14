"use client";

import React, { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect signed-in users from sign-in and sign-up pages
  useEffect(() => {
    if (isSignedIn && ["/sign-in", "/sign-up"].includes(pathname)) {
      router.push("/dashboard");
    }
  }, [isSignedIn, pathname, router]);

  return (
    <div className="bg-slate-100 h-full">
      <div className="md:w-64 hidden md:block fixed">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <div className="hidden md:block">
          <Header />
        </div>
        {children}
        <div>
            <Footer/>
        </div>
      </div>
    </div>
  );
}
