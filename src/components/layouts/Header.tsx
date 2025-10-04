import { isLoggedIn } from "@/lib/getCookie";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const loggedIn = await isLoggedIn();
  
  return <HeaderClient loggedIn={loggedIn} />;
}
