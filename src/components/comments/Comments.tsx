"use client";

import { useState, useEffect } from "react";
import { ButtonPlain, ButtonStrong } from "../ui/Buttons";
import StarRating from "../StarRating";
import { fakeComment } from "../../../public/assets/fakeData/fakeComment";
import StarIcon from "../icons.component/StarIcon";
import useModal from "@/hooks/useModal";

export default function Comments() {
  const { isModalOpen, isConfirmed, openModal, closeModal, confirmModal } =
    useModal();
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const maxLength = 200; // 최대 글자 수

  const currentPageComments = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return fakeComment.slice(start, end);
  };

  const totalPages = Math.ceil(fakeComment.length / itemsPerPage);

  const pageButtons = () => {
    const buttonArr = [];
    for (let i = 1; i <= totalPages; i++) {
      buttonArr.push(
        <ButtonPlain
          key={i}
          text={"[ " + i.toString() + " ]"}
          onClick={() => setCurrentPage(i)}
          isSmall
        />
      );
    }
    return buttonArr;
  };

  const handleReset = () => {
    if (!comment) {
      return;
    } else {
      openModal();
      if (isConfirmed) {
        setComment("");
      } else {
        return;
      }
    }
  };

  const handleRatingChange = (value: number) => {
    console.log("별점:", value);
  };

  return (
    <section className=" px-10 py-10 
    mb-24
    flex flex-col gap-15 
    relative z-1
    
    md:px-24 md:py-12 
    2xl:px-72 xl:py-24;">
      <div className="w-full border-3 border-primary rounded-2xl md:rounded-3xl ">
        <StarRating userRate={handleRatingChange} />
        <textarea
          name="opinion"
          maxLength={maxLength}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-5 md:p-10 resize-none"
          placeholder="여기에 댓글을 써주세요 (200자 이내)"
        />

        <p className="text-right mr-10 text-sm text-gray-500 mt-2">
          {comment.length} / {maxLength} 글자
        </p>
        <div className="p-5 md:p-10 flex justify-end gap-3 md:gap-10">
          <ButtonPlain text="취소" onClick={handleReset} />

          <ButtonStrong type="submit" text="등록하기" />
        </div>
      </div>

      <div className="min-h-[500px] flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          {currentPageComments().map((item, index) => (
            <div
              key={index}
              className="pb-3 md:pb-5 flex flex-col gap-3 md:gap-5 border-b-3 border-disabled"
            >
              <div className="">
                <div className="flex items-center gap-5">
                  <h6 className="text-lg md:text-2xl text-primary">
                    {item.nickname}
                  </h6>
                  <StarIcon rate={4.0} />
                </div>
                <div className="flex items-center gap-5">
                  <p className="text-textHover text-sm md:text-xl">
                    {item.date}
                  </p>
                  <ButtonPlain text="수정" isSmall />
                  {/* 삭제 확인 모달 추가 */}
                  <ButtonPlain text="삭제" isSmall />
                </div>
              </div>
              <p className="text-sm md:text-xl">{item.comment}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-5 gap-5">{pageButtons()}</div>
      </div>
    </section>
  );
}
