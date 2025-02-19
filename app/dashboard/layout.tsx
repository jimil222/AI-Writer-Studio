"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { UpdateContext } from "../(context)/UpdateContext";
import { UserSubscriptionContext } from "../(context)/UserSubscriptionContext";

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

  const [totalUsage, setTotalUsage] = useState<Number>(0);
  const [updateCreditUsage,setUpdateCreditUsage] = useState<any>();
  const [userSubscriptions, setuserSubscription] = useState<boolean>(false)

  return (
    <TotalUsageContext.Provider value={{totalUsage,setTotalUsage}}>
      <UserSubscriptionContext.Provider value={{userSubscriptions, setuserSubscription}}>
      <UpdateContext.Provider value={{updateCreditUsage,setUpdateCreditUsage}}>

    <div className="bg-slate-100 min-h-screen flex">
      {/* Sidebar */}
      <div className="md:w-64 hidden md:block fixed">
        <SideNav />
      </div>
      {/* Main content area */}
      <div className="flex flex-col md:ml-64 w-full min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        {/* Footer always at bottom */}
        <Footer />
      </div>
    </div>
      </UpdateContext.Provider>
    </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  );
}
