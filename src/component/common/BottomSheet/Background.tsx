import Image from "next/image";
import React from "react";

interface Props {
  onClick?: () => void;
  isFull?: boolean;
  src: string;
}
export const Background = ({ src, isFull, onClick }: Props) => {
  return (
    <div
      className={`relative h-[35vh] ${isFull && "bg-ui-dark-1"}`}
      style={isFull ? { height: "100dvh" } : {}}
    >
      <Image
        fill
        priority
        alt="알약사진"
        draggable={false}
        sizes="200px"
        src={src}
        style={{ objectFit: isFull ? "contain" : "cover" }}
        onClick={onClick}
      />
    </div>
  );
};
