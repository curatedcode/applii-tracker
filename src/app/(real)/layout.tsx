import SyncProvider from "@/src/components/Sync/SyncProvider";
import InitialDemoModal from "@/src/components/Demo/InitialDemoModal";
import Toaster from "@/src/components/Toaster";
import MobileNavbar from "@/src/components/MobileNavbar";
import Navbar from "@/src/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SyncProvider>
      <InitialDemoModal />
      <Toaster />
      <MobileNavbar />
      <Navbar />
      <main className="grid">{children}</main>
    </SyncProvider>
  );
}
