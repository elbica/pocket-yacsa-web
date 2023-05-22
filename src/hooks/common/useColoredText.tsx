import type { ReactNode } from "react";

interface Props {
  tagName: string;
  searchText: string;
}
interface ValidationProps {
  text: string;
  regularValidation: RegExp;
}

export const useValidation = ({ text, regularValidation }: ValidationProps) => {
  //확장성을 고려하여 정규식을 props 로 받기
  const checkValidation = !regularValidation.test(text);

  return { checkValidation };
};

export const useColoredText = ({ tagName, searchText }: Props) => {
  const index = tagName.search(searchText); //문자 있는 지 없는 확인
  const checkValidation = useValidation({
    text: searchText,
    regularValidation: /([^가-힣a-z\x20])/i, //나중에 체크할 정규식이 많아진다면 따로 파일로 분리해서 정리해도 조을듯!
  });

  const ColoredText: ReactNode = (
    <>
      {checkValidation && index !== -1 ? (
        <>
          <span>{tagName.slice(0, tagName.search(searchText))}</span>
          <span className="text-[#f65221]">{tagName.slice(index, index + searchText.length)}</span>
          <span>{tagName.slice(index + searchText.length)}</span>
        </>
      ) : (
        <span>{tagName}</span>
      )}
    </>
  );

  return { ColoredText };
};
