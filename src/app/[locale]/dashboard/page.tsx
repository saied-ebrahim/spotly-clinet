import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decryptData } from "@/shared/encryption";
import { DecryptedToken } from "@/types/DecryptedToken";

export default async function EventsDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sub");

  if (!token?.value) {
    redirect("/");
  }

  const tokenDecrypted = decryptData(token.value) as DecryptedToken;
  const role = tokenDecrypted?.role;

  if (role === "admin") {
    redirect("/dashboard/admin");
  } else if (role === "organizer") {
    redirect("/dashboard/organizer");
  } else {
    redirect("/");
  }
}
