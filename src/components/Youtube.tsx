import Image from "next/image";

export default function Youtube() {
  const videoId = "7DYAYzU0qM8";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const url = "https://www.youtube.com/watch?v=7DYAYzU0qM8";

  return (
    <div className="pt-32 pb-64 flex justify-center items-center">
      <a href={url}>
        <Image
          src={thumbnailUrl}
          alt="YouTube Thumbnail"
          width={500}
          height={300}
        />
        유튜브 보러가기
      </a>
    </div>
  );
}
