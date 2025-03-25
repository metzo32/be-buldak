"use client";

import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export default function FilterOptions() {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("추천순");
  const list = ["추천순", "매운순", "덜매운순", "별점 높은순", "별점 낮은순", ];

  const handleListOpen = () => {
    setIsListOpen(!isListOpen);
  };

  return (
    <div className="select-none relative flex justify-end">
      <div className="flex gap-1 items-center cursor-pointer" onClick={handleListOpen}>
        <p className="hover:text-textHover">{selected}</p>
        {isListOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      {isListOpen && (
        <div className="w-[120px] md:w-[150px] p-5 bg-close absolute top-10 right-0 z-20 shadow-xl">
          <ul className="flex flex-col gap-5 ">
            {list.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsListOpen(false);
                }}
                className="tpy-1 hover:text-primary cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
