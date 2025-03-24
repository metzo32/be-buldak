import Image from "next/image";



export function StarCommentFull() {
  return (
    <span className="flex items-center gap-1">
      <div className="relative w-[35px] h-[35px] md:w-[50px] md:h-[50px]">
        <Image src={"/assets/icons/star_full.svg"} alt="별점" fill />
      </div>
    </span>
  );
}

export function StarCommentHalf() {
  return (
    <span className="flex items-center gap-1">
      <div className="relative w-[35px] h-[35px] md:w-[50px] md:h-[50px]">
        <Image src={"/assets/icons/star_half.svg"} alt="별점" fill />
      </div>
    </span>
  );
}

export function StarCommentOutline() {
  return (
    <span className="flex items-center gap-1">
       <div className="relative w-[35px] h-[35px] md:w-[50px] md:h-[50px]">
        <Image src={"/assets/icons/star_outline.svg"} alt="별점" fill />
      </div>
    </span>
  );
}
