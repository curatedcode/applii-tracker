import SyncProvider from "@/src/components/Sync/SyncProvider";
import Toaster from "@/src/components/Toaster";
import Navbar from "@/src/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SyncProvider>
      <Toaster />
      <Navbar
        items={[
          { name: "Home", href: "/boards" },
          { name: "Create", href: "/boards/applications/create" },
          { name: "Metrics", href: "/boards/applications/metrics" },
        ]}
      />
      <main className="grid">{children}</main>
    </SyncProvider>
  );
}
