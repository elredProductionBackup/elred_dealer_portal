"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("authToken");
  }
  return false;
};

const ProtectedWrapper = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const publicRoutes = ["/", "/forgot-password"]; 

  useEffect(() => {
    const loggedIn = isAuthenticated();

    if (!loggedIn && !publicRoutes.includes(pathname)) {
      router.replace("/");
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <>
      {!publicRoutes.includes(pathname) && <Header />}

      <>{children}</>
    </>
  );
};

export default ProtectedWrapper;
