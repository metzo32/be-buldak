"use client";

import Image from "next/image";
import Section from "@/components/ui/Section";
import Comments from "@/components/comments/Comments";
import Recommend from "@/components/Recommend";
import TitleComp from "@/components/TitleComp";
import SaveButton from "@/components/icons.component/SaveButton";
import StarIcon from "@/components/icons.component/StarIcon";
import SpiceRate from "@/components/icons.component/SpiceRate";
import TriedButton from "@/components/TriedButton";
import Youtube from "@/components/ui/Youtube";
import { useQuery } from "@tanstack/react-query";
import {
  getIngredients,
  getIngredientsDetails,
} from "@/components/fetch/fetchIngredients";
import {
  addViewCount,
  getRecipeDetails,
  triedRecipe,
} from "@/components/fetch/fetchRecipies";
import { useSearchParams } from "next/navigation";
import type { Recipe } from "@/types/FetchRecipeType";
import { useUserStore } from "@/stores/useUserStore";
import { getCurrentUser } from "@/components/fetch/fetchUsers";
import useModal from "@/hooks/useModal";

interface PageProps {
  params: {
    id: string;
  };
}
export default function DetailPage({ params }: PageProps) {
  const { user } = useUserStore();

  console.log("params.id", params.id);
  const { id } = params;
  const recipeId = Number(id);

  // const { data: ingredients } = useQuery({
  //   queryKey: ["getData"],
  //   queryFn: getIngredients,
  // });

  // const { data: ingredientsDetail } = useQuery({
  //   queryKey: ["getDetailData", 1],
  //   queryFn: () => getIngredientsDetails(1),
  // });



  const { data: viewCount } = useQuery({
    queryKey: ["views", recipeId],
    queryFn: () => addViewCount(recipeId),
  });

  const { data: tried } = useQuery({
    queryKey: ["tried", recipeId],
    queryFn: () => triedRecipe(recipeId),
  });

  const {
    data: recipeDetail,
    isLoading,
    isError,
  } = useQuery<Recipe>({
    queryKey: ["recipeDetail", recipeId],
    queryFn: () => getRecipeDetails(recipeId),
  });

  if (isLoading) return <p>로딩중...</p>;
  if (isError) return <p>에러 발생</p>;
  if (!recipeDetail) return <p>데이터 없음</p>;

  return (
    <>
      <TitleComp
        title={recipeDetail?.title}
        subTitle={recipeDetail?.description}
        image={`/${recipeDetail?.image_path}`}
        alt={recipeDetail?.title}
        option={
          <>
            <div className="flex gap-3 md:gap-10">
              <StarIcon rate={recipeDetail?.rate} large />
              <SpiceRate spicy={recipeDetail?.spicy} large />
            </div>
            {user && (
              <div className="flex gap-10 lg:gap-20 relative z-1">
                <TriedButton recipeId={recipeId} />
                <SaveButton />
              </div>
            )}
          </>
        }
      />
      <Section title="재료" subText={`${recipeDetail.servings}인분 기준`}>
        <div className="w-full flex flex-col md:grid md:grid-cols-4 gap-3 md:gap-10">
          {recipeDetail.ingredients.length === 0 ? (
            <p>재료 정보가 없습니다.</p>
          ) : (
            recipeDetail.ingredients?.map((item, index) => (
              <p
                key={index}
                className={
                  index % 4 === 0
                    ? "text-left"
                    : index % 4 === 3
                    ? "text-left md:text-right"
                    : "text-left md:text-center"
                }
              >
                {item}
              </p>
            ))
          )}
        </div>
      </Section>
      <span className="pb-24 flex items-center justify-center">
        <div className="relative w-[50px] h-[50px] lg:w-[100px] lg:h-[100px]">
          <Image
            src="/assets/icons/ramen.svg"
            alt="라면 아이콘"
            fill
            className="object-contain"
          />
        </div>
      </span>
      <Section
        title="만드는 법"
        subText={`소요시간 약 ${recipeDetail.cooking_time}분`}
      >
        <div className="flex flex-col gap-5 md:gap-10">
          {recipeDetail?.steps.map((item, index) => (
            <div key={index} className="flex gap-5 items-start">
              <span className="text-primary text-xl md:text-2xl">
                {index + 1}.
              </span>
              <p className="py-1">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="추천 조합">
        <div className="grid grid-cols-2 lg:grid-cols-4 justify-items-center">
          {recipeDetail?.recommend_side_menus.map((menu) => (
            <div key={menu} className="w-48 h-48 bg-strong">
              사이드 메뉴 id: {menu}
            </div>
          ))}
        </div>
      </Section>
      <Comments />
      <Youtube />
      <Recommend />
    </>
  );
}
