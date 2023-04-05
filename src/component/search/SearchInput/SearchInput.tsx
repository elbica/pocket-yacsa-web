import type { ForwardedRef, InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import { Icon } from "@/component/common/Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  endComponents?: ReactNode;
}

//FIX : forwardRef 적용(추후에 autofocus 등을 위해 ref 사용 고려) , 나중에 Form 추가 고려
export const InputBase = forwardRef(function InputBase(
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { endComponents, ...rest } = props;

  return (
    <>
      <input {...rest} ref={ref} />
      {endComponents}
    </>
  );
});

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onReset?: () => void;
  onSearchByKeyWord?: () => void;
}

export const SearchInput = ({ onReset, onSearchByKeyWord, value, ...rest }: Props) => {
  return (
    <form
      className="relative flex w-full items-center justify-start py-16"
      onSubmit={(e) => {
        e.preventDefault();
        onSearchByKeyWord?.();
      }}
    >
      <InputBase
        className="font-suit text-16-semibold-140 h-56 w-full rounded-30 bg-gray-100 pl-22 pr-65 text-black outline-none placeholder:text-gray-500"
        value={value}
        {...rest}
        endComponents={
          <>
            {value && (
              <Icon
                className="absolute right-46 cursor-pointer"
                name="searchDelete"
                onClick={onReset}
              />
            )}
            <button className="absolute right-16">
              <Icon name="search" stroke="gray-600" />
            </button>
          </>
        }
      />
    </form>
  );
};
