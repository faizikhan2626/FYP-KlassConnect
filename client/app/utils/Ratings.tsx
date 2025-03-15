import React, { FC } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

type Props = {
  rating: number;
};

const Ratings: FC<Props> = ({ rating }) => {
  const star = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      star.push(
        <AiFillStar
          key={i}
          size={20}
          className="text-yellow-400 mr-2 cursor-pointer"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      star.push(
        <BsStarHalf
          key={i}
          size={17}
          className="text-yellow-400 mr-2 cursor-pointer"
        />
      );
    } else {
      star.push(
        <AiOutlineStar
          key={i}
          size={20}
          className="text-yellow-400  mr-2 cursor-pointer"
        />
      );
    }
  }
  return <div className="flex mt-1 ml-2 800px:mt-0 800px:ml-0">{star}</div>;
};

export default Ratings;
