import Dashboard from "./list"
import { auth } from "@/auth"
import { redirect } from "next/navigation";

export default async function Administrator() {
  const session = await auth();
  if (!session) redirect("/");

  return (
      <Dashboard />
  )
}