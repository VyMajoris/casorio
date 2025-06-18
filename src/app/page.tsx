"use client"
import DonationPage from "@/components/DonationPage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default  function Home() {

    function useCtrlBShortcut() {
    const router = useRouter();

    useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.ctrlKey && (e.key === "b" || e.key === "B")) {
          e.preventDefault();
          router.push("/config");
        }
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [router]);
  }

  useCtrlBShortcut();

  
  return <DonationPage />;
}
