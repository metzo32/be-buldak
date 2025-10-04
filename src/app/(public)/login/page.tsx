import LoginClient from '@/components/LoginPage/LoginClient'
import { isLoggedIn } from '@/lib/getCookie';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const loggedIn = await isLoggedIn();

  if (loggedIn) {
    console.log("로그인 상태. user페이지로 이동")
    redirect("/user")
  }

  return (
   <LoginClient/>
  )
}
