"use client";

import { useState } from "react";
import Section from "./Section";
import { ButtonPlain, ButtonStrong } from "./Buttons";

export default function Comments() {
  const [text, setText] = useState("");
  const maxLength = 200; // 최대 글자 수

  return (
    <Section title="댓글과 별점">
      <div className="w-full border-3 border-primary rounded-3xl ">
        <div className="h-[100px] px-10 border-b-3 border-primary flex items-center justify-center">
          <button className="text-4xl">★ ★ ★ ★ ★</button>
        </div>
        <textarea
          name="opinion"
          maxLength={maxLength}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-10 resize-none"
          placeholder="여기에 댓글을 써주세요 (200자 이내)"
        />

        <p className="text-right mr-10 text-sm text-gray-500 mt-2">
          {text.length} / {maxLength} 글자
        </p>
        <div className="p-10 flex justify-end gap-10">
          <ButtonPlain text="취소" />
          <ButtonStrong type="submit" text="등록하기" />
        </div>
      </div>

      {/* 댓글 5개씩 보여주기 */}
      <div className="pb-5 flex flex-col gap-5 border-b-3 border-disabled">
        <div className="flex items-center gap-5">
          <h6 className="text-2xl text-primary">닉네임</h6>
          <p className="text-textHover">2025.01.01</p>
        </div>
        <p>댓글 내용 내용 내용</p>
      </div>
      <div className="pb-5 flex flex-col gap-5 border-b-3 border-disabled">
        <div className="flex items-center gap-5">
          <h6 className="text-2xl text-primary">닉네임</h6>
          <p className="text-textHover">2025.01.01</p>
        </div>
        <p>댓글 내용 내용 내용</p>
      </div>
      <div className="pb-5 flex flex-col gap-5 border-b-3 border-disabled">
        <div className="flex items-center gap-5">
          <h6 className="text-2xl text-primary">닉네임</h6>
          <p className="text-textHover">2025.01.01</p>
        </div>
        <p>댓글 내용 내용 내용</p>
      </div>
    </Section>
  );
}
