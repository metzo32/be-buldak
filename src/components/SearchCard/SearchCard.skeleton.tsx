export default function SearchCardSkeleton() {
  return (
    <div className="bg-secondary flex flex-col md:flex-row w-full shadow-2xl h-300px animate-pulse">
      {/* 이미지 영역 */}
      <div className="w-full h-[180px] lg:w-[600px] lg:h-[300px] relative bg-gray-300" />

      {/* 텍스트 영역 */}
      <div className="w-full p-5 lg:p-10 flex flex-col justify-between gap-2 lg:gap-5">
        <div className="flex flex-col gap-2 lg:gap-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              {/* 제목 */}
              <div className="h-6 lg:h-8 w-32 lg:w-48 bg-gray-300 rounded" />
              {/* SpiceRate 자리 */}
              <div className="hidden lg:block h-6 w-20 bg-gray-300 rounded" />
            </div>
          </div>

          <div className="flex gap-2">
            {/* StarIcon 자리 */}
            <div className="h-6 w-24 bg-gray-300 rounded" />
            <div className="block lg:hidden h-6 w-16 bg-gray-300 rounded" />
          </div>
        </div>

        {/* description 자리 */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
          <div className="h-4 bg-gray-300 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}
