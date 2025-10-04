"use client";

import { useRouter } from "next/navigation";
import SearchCardContent from "./SearchCardContent";

type Props = {
  id: number;
  spicy: number;
  title: string;
  rate: number;
  image: string;
  altMessage: string;
  description: string;
};

export default function SearchCard(props: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/details/${props.id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <SearchCardContent {...props} />
    </div>
  );
}
