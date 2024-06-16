import { Toaster } from "@/components/ui/toaster.jsx";
export default function RootLayout({ children }) {
  return (
    <>
        <main>{children}</main>
        <Toaster />
        </>
  );
}
