// Redirects the home route to the catalog.
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/products");
}
