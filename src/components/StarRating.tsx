"use client";

import { useState } from "react";
import {
  StarCommentFull,
  StarCommentHalf,
  StarCommentOutline,
} from "./icons.component/StarComment";

interface StarRatingProps {
  userRate: (rating: number) => void; 
}

export default function StarRating({ userRate }: StarRatingProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const handleClick = (index: number) => {
    setRating(index);
    userRate(index);
  };

  return (
    <div
      className="h-[70px] md:h-[100px] px-10 border-b-3 border-primary flex items-center justify-center gap-1"
      onMouseLeave={handleMouseLeave}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isClicked = star <= rating;
        const isHovered = hoverIndex !== null && star <= hoverIndex;

        let StarIcon;
        if (isClicked) {
          StarIcon = StarCommentFull;
        } else if (!rating && isHovered) {
          StarIcon = StarCommentHalf;
        } else if (
          rating &&
          hoverIndex !== null &&
          star > rating &&
          star <= hoverIndex
        ) {
          StarIcon = StarCommentHalf;
        } else {
          StarIcon = StarCommentOutline;
        }

        return (
          <div
            key={star}
            onMouseEnter={() => handleMouseEnter(star)}
            onClick={() => handleClick(star)}
            className="cursor-pointer"
          >
            <StarIcon />
          </div>
        );
      })}
    </div>
  );
}
