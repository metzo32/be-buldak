import Recommend from "@/components/Recommend";
import TitleComp from "@/components/TitleComp";

export default function HomePage() {
  return (
    <>
      <TitleComp
        title="불닭이되"
        subTitle="세상의 모든 불닭볶음면 레시피"
        image="/assets/images/image_main.png"
        alt="불닭볶음면"
      />
      <Recommend />
    </>
  );
}
