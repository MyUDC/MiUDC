import { AppBar } from "@/shared/components/AppBar";

export default function AppBarLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div>
      <AppBar />
      {children}
    </div>
  );
}