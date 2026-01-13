import { redirect } from "next/navigation";

export default function Home() {
  // Redirigir al login como punto de entrada
  redirect("/login");
}
