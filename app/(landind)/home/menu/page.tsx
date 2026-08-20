import { Suspense } from "react";
import MenuPage from "../components/layout/MenuPage";

export default function MenuRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenuPage />
    </Suspense>
  );
}
