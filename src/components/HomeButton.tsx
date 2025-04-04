import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };
  
  return (
    <>
      <button onClick={handleHome} className="block md:hidden">
        <Image
          src="/assets/icons/fire.svg"
          alt="홈"
          width={25}
          height={25}
        />
      </button>
      <button
        onClick={handleHome}
        className="hidden md:block text-3xl font-bold"
      >
        불닭이되
      </button>
    </>
  );
}
