import UpperNavbarComponent from "./upperNavbar";
import SecondaryNavbar from "./secondaryNavbar";
import { useMeQuery } from "@/generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Navbar({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (theme: string) => void;
}) {
  const { data, loading, error } = useMeQuery();

  if (!data?.Me) return;

  return (
    <nav className="sticky top-0 z-50 bg-background text-foreground">
      <UpperNavbarComponent theme={theme} setTheme={setTheme} />
      <SecondaryNavbar />
    </nav>
  );
}
