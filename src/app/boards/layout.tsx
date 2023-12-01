import Navbar from "@/src/components/Navbar";
import SyncProvider from "@/src/components/Sync/SyncProvider";
import Toaster from "@/src/components/Toaster";

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
        showSettingsGear={true}
      />
      <main className="grid">{children}</main>
    </SyncProvider>
  );
}
